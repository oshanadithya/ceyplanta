export const getBase64Logo = async () => {
    const response = await fetch('/assets/logo_2.png');
    const blob = await response.blob();
  
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };