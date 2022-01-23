import { init } from "@rematch/core";
import clients from "./models/clients/client.index";
import appointments from "./models/appointments/appointment.index";
import register from "./models/register/register.index";
import auth from "./models/auth/auth.index";
import UI from "./models/UI/ui.index";

const models = {
  auth,
  clients,
  appointments,
  register,
  UI,
};

const store = init({
  models,
});

export default store;
