import supabase from '../utils/supabase';
import { useState, useEffect } from 'react';


interface Todo{
    id: number;
    title: string;

}

export default function Home(){
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [todoLists, setTodoLists] = useState<Todo[] | null>(null);

    useEffect(() => {
        const fetchTodoLists = async () => {
            const { data, error } = await supabase 
            .from('todos') // Selecting of what table we are trying to fetch
            .select()

            if(error){
                setFetchError('Could not fetch the todo list');
                setTodoLists(null);
                console.log(error);
            }

            if(data){
                setTodoLists(data);
                setFetchError(null);

            }
        }

        fetchTodoLists();

    }, []);

    return(
        
        <div className='page home'>
            {/* <h2>Home</h2> */}
     
            {fetchError && (<p>{fetchError}</p>)}
            {todoLists && (
                <div className='todoLists'>
                    {todoLists.map(todoList => (

                        <p key={todoList.id}>{todoList.title}</p>
                    ))}

                </div>

            )}
        
        </div>

    );

}