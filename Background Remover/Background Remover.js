document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('beforeImage');
            img.src = e.target.result;
            document.getElementById('afterImage').src = "#"; // Clear previous result
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removeBgBtn').addEventListener('click', async function() {
    const fileInput = document.getElementById('imageUpload');
    if (!fileInput.files[0]) {
        alert("Please upload an image first.");
        return;
    }

    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': '5YDv3oLUUuUhBddPMGAQ2YVX', // Replace with your Remove.bg API key
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        document.getElementById('afterImage').src = url;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove background. Please try again.');
    } finally {
        loading.style.display = 'none';
    }
});

document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('beforeImage').src = "#";
    document.getElementById('afterImage').src = "#";
    document.getElementById('imageUpload').value = "";
});