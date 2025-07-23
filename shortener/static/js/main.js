
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shortener-form');
    const longUrlInput = document.getElementById('long-url');
    const resultDiv = document.getElementById('result');
    const shortUrlDisplay = document.getElementById('short-url-display');
    const copyButton = document.getElementById('copy-button');
    const errorMessage = document.getElementById('error-message');

    function getCsrfToken() {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            return metaTag.content;
        }

        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken' + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const long_url = longUrlInput.value;

        resultDiv.classList.add('hidden');
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            errorMessage.textContent = 'CSRF token missing. Please refresh the page.';
            errorMessage.classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch('/shorten/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ long_url: long_url })
            });

            const data = await response.json();

            if (response.ok) {
                shortUrlDisplay.href = data.short_url;
                shortUrlDisplay.textContent = data.short_url;
                resultDiv.classList.remove('hidden');
            } else {
                errorMessage.textContent = data.error || 'Something went wrong.';
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            errorMessage.textContent = 'Network error or server unavailable.';
            errorMessage.classList.remove('hidden');
            console.error('Error:', error);
        }
    });

    copyButton.addEventListener('click', () => {
        const shortUrlText = shortUrlDisplay.textContent;
        navigator.clipboard.writeText(shortUrlText).then(() => {
            alert('Short URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Could not copy URL. Please copy manually.');
        });
    });
});