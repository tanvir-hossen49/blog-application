import { useForm } from "react-hook-form";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { searchUser } from "../store/postsSlice";

const SearchBox = () => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        const { value } = e.target;
        setValue("title", value); 
        dispatch(searchUser(value));
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input type='text' placeholder="Start typing to search"
                {...register("title", { required: true })}
                onChange={handleChange}
            />            
        </form>
    );
};

export default SearchBox;