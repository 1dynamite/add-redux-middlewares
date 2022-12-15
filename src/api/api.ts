const generateUniqueId = (() => {
  let id = 0;
  return () => {
    const stringId = id.toString();
    ++id;
    return stringId;
  };
})();

export const addTodo = async (text: string) => {
  return await new Promise<{ id: string; text: string; completed: boolean }>(
    (resolve) =>
      setTimeout(() =>
        resolve({ id: generateUniqueId(), text, completed: false })
      )
  );
};

export const editTodo = async (id: string, completed: boolean) => {
  return await new Promise<{ id: string; completed: boolean }>((resolve) =>
    setTimeout(() => resolve({ id, completed }))
  );
};

export const removeTodo = async (id: string) => {
  return await new Promise<string>((resolve) => setTimeout(() => resolve(id)));
};
