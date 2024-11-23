import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamsList } from "./index";
import SortAndContext from "../../components/Navigation/Navbar/Components/SortAndContext";
import MessagesPage from "../../pages/MessagesPage";

type MessagesScreenProps = {
    StackNavigator: ReturnType<typeof createNativeStackNavigator<StackParamsList>>;
}

export default function MessagesScreen({ StackNavigator }: MessagesScreenProps) {
    return (
        <StackNavigator.Screen<'MessagesPage'>
            name="MessagesPage"
            component={MessagesPage}
            options={{
                headerTitle: 'Inbox',
            }}
        />
    )
}