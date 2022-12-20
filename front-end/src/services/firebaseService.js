import API from 'API';

export const uploadPhoto = async (file) => {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await API.post('/api/files/upload-photo', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
