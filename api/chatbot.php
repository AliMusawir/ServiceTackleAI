<?php
/**
 * ServiceTackle AI — Production AI Advisor Backend
 * Ultra-concise, sharp human-like solutions consultant with dynamic context-relevant chips.
 */

require_once __DIR__ . '/config.php';

// Rate Limiting (40 messages per 5 minutes)
checkRateLimit('chatbot_msg', 40, 300);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Please use POST.', [], 405);
}

$input = getJsonInput();
if (empty($input)) {
    $input = $_POST;
}

$userMessage = sanitizeInput($input['message'] ?? '');
$history = $input['history'] ?? [];

if (empty($userMessage)) {
    sendJsonResponse(false, 'Please provide a message.', [], 400);
}

$apiKey = getEnvVar('OPENAI_API_KEY', '');
$model  = getEnvVar('OPENAI_MODEL', 'gpt-4o-mini');

// ─── AI Advisor Prompt ──────────────────────────
$systemPrompt = <<<EOT
You are ServiceTackle AI Advisor. Answer ONLY ServiceTackle questions.

RULES:
- Clean text only (NO markdown, bullets, dashes)
- Be conversational and confident
- ALWAYS end with: [CHIPS: Action 1 | Action 2 | Action 3]
- Remember conversation context

BOOKING DEMOS:
When user wants to book/schedule/talk to team:
1. Ask: "What's your full name?"
2. Ask: "What's your email?"
3. Ask: "Your phone number?" (optional)
4. Ask: "What interests you?"
5. Say: "Perfect! Let me submit this..."
6. Return: [FORM_SUBMIT: name=Name | email=email@example.com | phone=123 | service=Service | message=Summary]
7. After: "Done! Submitted: name, email, phone, service. Team contacts within 24h."

SERVICES:
- Voice Agent: Phone, booking, transfers (24/7)
- Web Agent: Chat, leads capture
- Business Automation: Workflows, CRM integration
- Document AI: Invoice OCR, document processing

PRICING:
- All pricing is customized based on your business volume and needs
- When asked about cost, explain it's tailored and offer to connect them with team for quote

EXAMPLES:
User: "How does Voice Agent work?"
You: "Voice Agent answers calls 24/7, books appointments, and transfers to your team when needed. Uses natural language so callers feel like they're talking to a real person."
[CHIPS: See pricing | Book demo | Hear it speak]

User: "Book a demo"
You: "I'd be happy to connect you! What's your full name?"
[CHIPS: Skip | Tell me more first]

TONE: Natural, helpful, varied.
EOT;

if (!empty($apiKey) && str_starts_with($apiKey, 'sk-')) {
    $messages = [
        ['role' => 'system', 'content' => $systemPrompt]
    ];

    // Append conversation history (up to last 10 messages)
    if (is_array($history)) {
        $recentHistory = array_slice($history, -10);
        foreach ($recentHistory as $msg) {
            if (isset($msg['role']) && isset($msg['content'])) {
                $role = in_array($msg['role'], ['user', 'assistant']) ? $msg['role'] : 'user';
                $messages[] = [
                    'role' => $role,
                    'content' => (string)$msg['content']
                ];
            }
        }
    }

    $messages[] = ['role' => 'user', 'content' => $userMessage];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'model' => $model,
        'messages' => $messages,
        'temperature' => 0.9,
        'max_tokens' => 150
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $data = json_decode($response, true);
        $rawReply = trim($data['choices'][0]['message']['content'] ?? '');
        
        if (!empty($rawReply)) {
            $chips = [];
            $formData = null;
            $cleanReply = $rawReply;

            // Extract [FORM_SUBMIT: name=... | email=... | ...]
            if (preg_match('/\[FORM_SUBMIT:\s*(.*?)\]/is', $rawReply, $formMatches)) {
                $formStr = $formMatches[1];
                $cleanReply = trim(preg_replace('/\[FORM_SUBMIT:\s*.*?\]/is', '', $rawReply));
                
                // Parse form fields
                $formData = [];
                $fields = explode('|', $formStr);
                foreach ($fields as $field) {
                    $parts = explode('=', trim($field), 2);
                    if (count($parts) === 2) {
                        $formData[trim($parts[0])] = trim($parts[1]);
                    }
                }
            }

            // Extract [CHIPS: Option 1 | Option 2 | Option 3]
            if (preg_match('/\[CHIPS:\s*(.*?)\]/is', $rawReply, $matches)) {
                $chipsStr = $matches[1];
                $cleanReply = trim(preg_replace('/\[CHIPS:\s*.*?\]/is', '', $cleanReply));
                $parts = explode('|', $chipsStr);
                foreach ($parts as $p) {
                    $trimmed = trim($p);
                    if (!empty($trimmed)) {
                        $chips[] = $trimmed;
                    }
                }
            }

            // Fallback chips if model omitted the tag
            if (empty($chips)) {
                $chips = ['See Demo', 'Talk to our team', 'Get a recommendation'];
            }

            $responseData = [
                'reply' => $cleanReply,
                'chips' => $chips,
                'source' => 'openai'
            ];
            
            if ($formData) {
                $responseData['formData'] = $formData;
            }

            sendJsonResponse(true, 'Response generated', $responseData);
        }
    }
}

$apiError = '';
if ($response) {
    $errorData = json_decode($response, true);
    $apiError = $errorData['error']['message'] ?? '';
}

// Clean context-aware fallback if API is unreachable
sendJsonResponse(false, 'Unable to generate dynamic AI response', [
    'error' => $curlError ?: $apiError ?: 'OpenAI API non-200 status: ' . ($httpCode ?? 0),
    'source' => 'error'
]);
