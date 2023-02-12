import 'react-native-gesture-handler';
import store from "./store";
import { Provider } from "react-redux";
import Main from './src/Main';


export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}