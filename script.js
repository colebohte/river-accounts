document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('createAccountForm');
    const messageElement = document.getElementById('message');
    const supabaseUrl = 'https://tzrbsxhleqgcwfgfnrav.supabase.co';
    const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cmJzeGhsZXFnY3dmZ2ZucmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTg3ODksImV4cCI6MjA2MDgzNDc4OX0.pr2IbmvcnpmisHfTHDSC2VP8IgeiAD2FQ70w8fNRNGA';

    createAccountForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const newUsername = usernameInput.value;
        const newPassword = passwordInput.value;
        const confirmPassword = passwordConfirmInput.value;

        if (newPassword !== confirmPassword) {
            messageElement.textContent = "Passwords do not match!"; // Update messageElement
            return;
        }

        const requestBody = JSON.stringify({
            username: newUsername,
            password: newPassword
        });

        try {
            const response = await fetch(`${supabaseUrl}/functions/v1/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${anonKey}`,
                },
                body: requestBody
            });

            if (response.ok) {
                const responseText = await response.text();
                if (responseText) {
                    const data = JSON.parse(responseText);
                    console.log('Account created:', data);
                    messageElement.textContent = 'Account created successfully!';
                } else {
                    console.log('Account created successfully (empty response body)');
                    messageElement.textContent = "Account created successfully, You may now log in.";
                }
                usernameInput.value = '';
                passwordInput.value = '';
                passwordConfirmInput.value = '';
            } else {
                const data = await response.json();
                messageElement.textContent = `Error creating account: ${data.message || response.statusText}`;
                console.error('Error creating account:', data);
            }

        } catch (error) {
            messageElement.textContent = `Network error: ${error.message}`;
            console.error('Network error:', error);
        }
    });
});
