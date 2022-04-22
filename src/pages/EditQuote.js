import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import EditQuoteForm from "../components/quotes/EditQuoteForm";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote, updateQuote } from "../lib/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { toast } from 'react-toastify';

const EditQuote = () => {
    const params = useParams();
    const history = useHistory(); 
    const [isDisableUpdateButton, setIsDisableUpdateButton] = useState(false);
    const { 
        sendRequest, 
        status, 
        data: quoteData, 
        error 
    } = useHttp(getSingleQuote, true);
    const { 
        sendRequest: sendRequestUpdate, 
        status: statusUpdate, 
        data: quoteDataUpdate, 
        error: errorUpdate 
    } = useHttp(updateQuote);

    useEffect(()=>{
        sendRequest(params.id);
    },[]);

    useEffect(() => {
        if(statusUpdate === 'completed' && !errorUpdate){
            toast.success('Quote updated successfully.');
            history.push('/quotes');
        }else if(statusUpdate === 'completed' && errorUpdate){
            toast.error('Something went wrong.');
        }
    }, [statusUpdate, errorUpdate, history]);

    const updateQuoteHandler = (newData) => {
        newData.id = params.id;
        setIsDisableUpdateButton(true);
        sendRequestUpdate(newData);
    }

    if(status === 'pending'){
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if(error){
        return <p style={{color:'black'}} className="centered focused">{error}</p>
    }

    const quote = JSON.parse(quoteData.data);
    return (
        <EditQuoteForm 
            text={quote.text} 
            author={quote.author} 
            onUpdate={updateQuoteHandler}
            disableUpdateButton={isDisableUpdateButton} 
        />
    )
}

export default EditQuote;