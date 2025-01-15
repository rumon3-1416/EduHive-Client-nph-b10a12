import axios from 'axios';

const useImgUrl = () => {
  const generateImgUrl = async image => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );

    return data.data.display_url;
  };

  return generateImgUrl;
};

export default useImgUrl;
