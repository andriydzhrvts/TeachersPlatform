import API from 'API';

export const getLevels = async () => {
  const { data } = await API.get('/api/questions/levels');
  return data;
};

export const getQuestionsUnitsByLevel = async (level) => {
  const { data } = await API.get('/api/questions/units', { params: { level } });
  return data;
};

export const getTopicDataByUnitAndLevel = async (params) => {
  const { data } = await API.get('/api/questions/tests', { params });
  return data;
};

export const getQuestionsByUnitName = async (params) => {
  const { data } = await API.get('/api/questions/', { params });
  return data;
};

export const getTestById = async (id) => {
  const response = await API.get(`/api/questions/${id}`);
  return response.data;
};

export const createTest = async (question) => {
  const { data } = await API.post('/api/questions', question);
  return data;
};

export const deleteTest = async (id) => {
  const { data } = await API.delete(`/api/questions/${id}`);
  return data;
};

export const updateTest = async (id, question) => {
  const { data } = await API.patch(`api/questions/${id}`, question);
  return data;
};

export const getCountOfTopicQuestions = async (params) => {
  const { data } = await API.get('/api/questions/count-of-topics', { params });
  return data;
};
