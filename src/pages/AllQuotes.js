import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/hooks/use-http";
import { getAllQuotes } from "../lib/lib/api";
import { deleteQuote } from "../lib/lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { toast } from 'react-toastify';

const AllQuotes = () => {
    const history = useHistory();
    const { 
        sendRequest, 
        status, 
        data: allquotes, 
        error 
    } = useHttp(getAllQuotes, true);

    const { 
        sendRequest: sendRequestDelete, 
        status: statusDelete, 
        data: dataDelete, 
        error: errorDelete 
    } = useHttp(deleteQuote);

    const deleteQuoteHandler = (quoteId) => {
        console.log('click delete=>'+quoteId);
        sendRequestDelete(quoteId);
    }

    useEffect(()=>{
        sendRequest();
    }, []);

    console.log(status);
    console.log(statusDelete);

    if(status === 'pending' || statusDelete === 'pending'){
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if(statusDelete === 'completed'){
        toast.success('Quote deleted successfully.');
        history.push('/');
    }

    if(error){
        return <p style={{color: 'black'}} className="centered focused">{error}</p>
    }

    if(status === 'completed'){
        const { status: responseStatus, data:responseQuoteData } = allquotes;
        if(responseStatus === 'error'){
            return <p style={{color: 'black', fontSize: '2rem'}} className="centered focused">Something went wrong.</p>
        }else if(responseStatus === 'success' && responseQuoteData.length === 0){
            return <NoQuotesFound />
        }else if(responseStatus === 'success' && responseQuoteData.length > 0){
            return <QuoteList quotes={responseQuoteData} onDelete={deleteQuoteHandler} />
        }else{
            return <p style={{color: 'black'}} className="centered focused">Something went wrong</p>
        }
    }
}

export default AllQuotes;