import TelegramLoginButton from "react-telegram-login";

const TelegramLogin = () => {
  const handleTelegramResponse = (response) => {
    const url = `${BACKEND_URL}/telegram/login`;

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: response.first_name,
        chatId: response.id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) console.log(res);
      });
  };

  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="NUSFitness_Bot"
    />
  );
};

export default TelegramLogin;
