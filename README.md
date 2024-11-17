function copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => console.log('Text copied to clipboard!'))
            .catch(err => console.error('Failed to copy text:', err));
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Text copied to clipboard (fallback method)');
    }
}

// Example usage:
copyTextToClipboard('Hello, world!');
