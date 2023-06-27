const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as any);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  });
};

export const fileSvc = {
  fileToBase64,
};
