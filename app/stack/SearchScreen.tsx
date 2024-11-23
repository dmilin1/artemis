import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamsList } from "./index";
import SortAndContext from "../../components/RedditDataRepresentations/Navbar/SortAndContext";
import SearchPage from "../../pages/SearchPage";

type SearchScreenProps = {
    StackNavigator: ReturnType<typeof createNativeStackNavigator<StackParamsList>>;
}

export default function SearchScreen({ StackNavigator }: SearchScreenProps) {
    return (
        <StackNavigator.Screen<'SearchPage'>
            name="SearchPage"
            component={SearchPage}
            options={{
                headerTitle: 'Search',
            }}
        />
    )
}