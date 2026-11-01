<?php
/**
 * ServiceTackle AI — Contact & Consultation Dual-Email Dispatcher
 * Sends formatted alert to Admin and instant confirmation email to Client via Authenticated Hostinger SMTP.
 */

require_once __DIR__ . '/config.php';

// Rate Limiting (10 requests per 3 minutes)
checkRateLimit('contact_form', 10, 180);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Please use POST.', [], 405);
}

$input = getJsonInput();
if (empty($input)) {
    $input = $_POST;
}

// 1. Honeypot check (anti-spam bot trap)
if (!empty($input['website_hp'])) {
    sendJsonResponse(true, 'Consultation request received successfully.');
}

// 2. Extract & Sanitize Fields
$name    = sanitizeInput($input['name'] ?? '');
$email   = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone   = sanitizeInput($input['phone'] ?? '');
$company = sanitizeInput($input['company'] ?? 'Not specified');
$service = sanitizeInput($input['service'] ?? 'General AI Consultation');
$budget  = sanitizeInput($input['budget'] ?? 'Standard');
$message = sanitizeInput($input['message'] ?? '');

// 3. Validate Required Fields
if (empty($name) || !$email || empty($message)) {
    sendJsonResponse(false, 'Please provide your Name, a valid Email, and your message or bottleneck.', [], 422);
}

// 4. Configuration from .env
$adminEmail   = getEnvVar('ADMIN_EMAIL', 'contact@servicetackle.com');
$senderEmail  = getEnvVar('SMTP_FROM_EMAIL', 'contact@servicetackle.com');
$senderName   = getEnvVar('SMTP_FROM_NAME', 'ServiceTackle AI');
$companyName  = getEnvVar('COMPANY_NAME', 'ServiceTackle AI');
$siteUrl      = getEnvVar('SITE_URL', 'https://servicetackle.com');

// ── Authenticated Hostinger SMTP Sender Function ──────────────────────────────
function sendHostingerHtmlEmail(string $toEmail, string $toName, string $subject, string $htmlBody, string $replyToEmail = ''): bool {
    $smtpHost = getEnvVar('SMTP_HOST', 'smtp.hostinger.com');
    $smtpPort = (int)getEnvVar('SMTP_PORT', 465);
    $smtpUser = getEnvVar('SMTP_USERNAME', 'contact@servicetackle.com');
    $smtpPass = getEnvVar('SMTP_PASSWORD', '');
    $fromEmail= getEnvVar('SMTP_FROM_EMAIL', 'contact@servicetackle.com');
    $fromName = getEnvVar('SMTP_FROM_NAME', 'ServiceTackle AI');

    if (empty($replyToEmail)) $replyToEmail = $fromEmail;

    // If SMTP credentials configured, send via Hostinger Authenticated SMTP (Port 465 SSL)
    if (!empty($smtpPass) && $smtpPass !== 'your-email-password-here') {
        try {
            $protocol = ($smtpPort === 465) ? 'ssl://' : '';
            $timeout  = 12;
            $context  = stream_context_create([
                'ssl' => [
                    'verify_peer' => true,
                    'verify_peer_name' => true,
                    'allow_self_signed' => false,
                ]
            ]);

            $socket = @stream_socket_client("{$protocol}{$smtpHost}:{$smtpPort}", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
            if ($socket) {
                $read = function() use ($socket) {
                    $data = '';
                    while ($str = fgets($socket, 515)) {
                        $data .= $str;
                        if (substr($str, 3, 1) === ' ') break;
                    }
                    return $data;
                };

                $send = function($cmd) use ($socket, $read) {
                    fputs($socket, $cmd . "\r\n");
                    return $read();
                };

                $read(); // Initial greeting
                $send("EHLO " . gethostname());
                $send("AUTH LOGIN");
                $send(base64_encode($smtpUser));
                $authRes = $send(base64_encode($smtpPass));

                if (str_starts_with($authRes, '235')) {
                    $send("MAIL FROM:<{$fromEmail}>");
                    $send("RCPT TO:<{$toEmail}>");
                    $send("DATA");

                    $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
                    $headers .= "To: =?UTF-8?B?" . base64_encode($toName) . "?= <{$toEmail}>\r\n";
                    $headers .= "Reply-To: <{$replyToEmail}>\r\n";
                    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
                    $headers .= "MIME-Version: 1.0\r\n";
                    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
                    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
                    $headers .= "Date: " . date('r') . "\r\n";

                    $msg = $headers . "\r\n" . $htmlBody . "\r\n.\r\n";
                    fputs($socket, $msg);
                    $finalRes = $read();

                    $send("QUIT");
                    fclose($socket);

                    if (str_starts_with($finalRes, '250')) {
                        return true;
                    }
                } else {
                    fclose($socket);
                }
            }
        } catch (\Throwable $e) {}
    }

    // Fallback to PHP mail()
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "Reply-To: <{$replyToEmail}>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return @mail($toEmail, $subject, $htmlBody, $headers);
}

// 5. Build Admin Notification Email
$adminSubject = "🚀 New Lead: {$name} ({$company}) - ServiceTackle AI";
$adminBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: #0b0f1e; color: #ffffff; padding: 24px 28px; }
    .header h2 { margin: 0 0 4px 0; font-size: 20px; color: #38bdf8; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 28px; }
    .row { display: flex; margin-bottom: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .label { font-weight: 600; width: 140px; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { font-weight: 500; color: #0f172a; flex: 1; font-size: 15px; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; margin-top: 18px; font-size: 14px; line-height: 1.6; color: #334155; }
    .footer { background: #f1f5f9; padding: 16px 28px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h2>ServiceTackle AI — New Consultation Request</h2>
      <p>Received on " . date('F j, Y, g:i a') . " (Server Time)</p>
    </div>
    <div class='content'>
      <div class='row'><div class='label'>Full Name</div><div class='value'>{$name}</div></div>
      <div class='row'><div class='label'>Email</div><div class='value'><a href='mailto:{$email}'>{$email}</a></div></div>
      <div class='row'><div class='label'>Phone</div><div class='value'>{$phone}</div></div>
      <div class='row'><div class='label'>Company</div><div class='value'>{$company}</div></div>
      <div class='row'><div class='label'>Target Service</div><div class='value'><strong style='color:#2563eb'>{$service}</strong></div></div>
      <div class='row'><div class='label'>Budget / Scale</div><div class='value'>{$budget}</div></div>
      
      <div style='margin-top:20px;'>
        <div class='label'>Project Requirements & Bottlenecks:</div>
        <div class='message-box'>" . nl2br($message) . "</div>
      </div>
    </div>
    <div class='footer'>
      Direct reply to this email will respond directly to <strong>{$email}</strong>.
    </div>
  </div>
</body>
</html>
";

sendHostingerHtmlEmail($adminEmail, "ServiceTackle AI Admin", $adminSubject, $adminBody, $email);

// 6. Build Client Confirmation Email
$clientSubject = "Thank You for Contacting ServiceTackle AI — We Received Your Request";
$clientBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #0b0f1e; color: #ffffff; padding: 32px 28px; text-align: center; }
    .header h1 { margin: 0 0 8px 0; font-size: 24px; color: #ffffff; }
    .header span { color: #38bdf8; }
    .header p { margin: 0; font-size: 14px; color: #94a3b8; }
    .content { padding: 32px 28px; line-height: 1.6; font-size: 15px; color: #334155; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; }
    .step-list { margin: 18px 0 24px 0; padding-left: 20px; }
    .step-list li { margin-bottom: 8px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff !important; padding: 12px 26px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 10px; }
    .footer { background: #f1f5f9; padding: 20px 28px; font-size: 13px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>ServiceTackle <span>AI</span></h1>
      <p>Autonomous AI Systems & Workflow Automation</p>
    </div>
    <div class='content'>
      <p>Hi <strong>{$name}</strong>,</p>
      <p>Thank you for reaching out to ServiceTackle AI! We have received your inquiry regarding <strong>{$service}</strong>.</p>
      
      <p>One of our AI Solution Engineers is currently reviewing your project details. Here is what happens next:</p>
      
      <ol class='step-list'>
        <li><strong>Workflow Feasibility Audit:</strong> We analyze your requirements and identify the highest-ROI automation path.</li>
        <li><strong>Initial Strategy Call:</strong> We'll reach out within 2–4 business hours with a clear roadmap and answer any technical questions.</li>
        <li><strong>Custom Architecture & Live Demo:</strong> We demonstrate a live working prototype tailored to your tools (CRMs, phone lines, messaging).</li>
      </ol>
      
      <div class='summary-card'>
        <div style='font-weight:600;color:#0f172a;margin-bottom:6px;'>Your Submission Summary:</div>
        <div style='font-size:14px;color:#64748b;'><strong>Service:</strong> {$service}</div>
        <div style='font-size:14px;color:#64748b;'><strong>Company:</strong> {$company}</div>
      </div>
      
      <p>Need urgent assistance? Feel free to reply directly to this email or visit our website to explore live AI demos.</p>
      
      <div style='text-align:center;margin-top:24px;'>
        <a href='{$siteUrl}' class='btn'>Explore ServiceTackle AI</a>
      </div>
    </div>
    <div class='footer'>
      © " . date('Y') . " ServiceTackle AI. All rights reserved.<br>
      Automating operations for modern growing businesses.
    </div>
  </div>
</body>
</html>
";

sendHostingerHtmlEmail($email, $name, $clientSubject, $clientBody, $adminEmail);

// 7. Success Response
sendJsonResponse(true, 'Your consultation request has been received! A confirmation email has been sent to your address.', [
    'lead_name' => $name,
    'service' => $service
]);
