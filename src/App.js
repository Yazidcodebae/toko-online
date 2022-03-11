import Modal from "react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./commons/redux/store";
import Router from "./Router";

Modal.setAppElement("#root");
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;

// 1. auth - login
//         - register
// 2. product - list
//            - detail
// 3. cart - list
// 4. checkout - checkout
// 5. profile - update profile
//            - update password
//            - alamat
// 6. coupon - list
// 7. order - list
//          - detail
