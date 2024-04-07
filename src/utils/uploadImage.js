


export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await fetch('https://api.imgur.com/3/image', {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID 86f656ab03b0dcf', // Вставьте ваш Client ID Imgur
			},
			body: formData,
		});

		const data = await response.json();
		console.log(data);

		return data.data.link;
	} catch (error) {
		console.error('Error uploading image to Imgur:', error);
	}
};