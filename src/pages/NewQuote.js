import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";

import useHttp from "../hooks/hooks/use-http";
import { addQuote } from "../lib/lib/api";
import { toast } from 'react-toastify';

const NewQuote = () => {
    const {sendRequest, status, data, error } = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
        if(status === 'completed' && !error){
            toast.success('Quote added successfully.');
            setTimeout(()=>{
                history.push('/quotes');
            }, 3000);
        }else if(status === 'completed' && error){
            toast.error('Something went wrong.');
        }

    }, [status, history]);
    
    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
        // console.log(quoteData);

        // history.push('/quotes');
    }

    return <QuoteForm isLoading={status === 'pending'} success={status === 'completed'} onAddQuote={addQuoteHandler} />
}

export default NewQuote;