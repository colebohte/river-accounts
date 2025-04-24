document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('createAccountForm');
    const messageElement = document.getElementById('message');
    const supabaseUrl = 'https://tzrbsxhleqgcwfgfnrav.supabase.co'; // Your Supabase project URL
    const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cmJzeGhsZXFnY3dmZ2ZucmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTg3ODksImV4cCI6MjA2MDgzNDc4OX0.pr2IbmvcnpmisHfTHDSC2VP8IgeiAD2FQ70w8fNRNGA'; // Replace with your actual Supabase anon key

    createAccountForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const newUsername = usernameInput.value;
        const newPassword = passwordInput.value;

        const requestBody = JSON.stringify({
            username: newUsername,
            password: newPassword
        });

        try {
            const response = await fetch(`${supabaseUrl}/functions/v1/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${anonKey}`, // Include the anon key
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
                    alert("Account created successfully, You may now log in.")
                }
                usernameInput.value = '';
                passwordInput.value = '';
            } else {
                const data = await response.json();
                alert(`Error creating account: ${data.message || response.statusText}`)
                console.error('Error creating account:', data);
            }

        } catch (error) {
            alert(`Network error: ${error.message}`)
            console.error('Network error:', error);
        }
    });
});