import requests


image_path = "./test/imgs/pexels-soldiervip-20630719.jpg" # credits Tuấn Kiệt Jr.: https://www.pexels.com/es-es/foto/20630719/

url = "<my ngrok url>/generar"

payload = {
    "prompt": "photography of a beautiful girl, flowers, blue dress, smiling, holding a bouquet of flowers, nature background",
    "negative_prompt": "",
    "strength": "0.7"
}

files = {
    "image": open(image_path, "rb")
}


def generate_image (payload, files, url):
   
    try:
        response = requests.post(url, data=payload, files=files)
        if response.ok:
            print("✅ Image generated:")
            return response.json()
        else:
            print("❌ Error:", response.status_code, response.text)
            return None
    except Exception as e:
        print("❌ An error occurred:", str(e))
        return None

result = generate_image(payload, files, url)
