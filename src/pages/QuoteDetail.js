import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, Route, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const dummyQuotes = [
//     {
//         id: 1,
//         author: 'Prakash',
//         text: 'Lorem ipsum dummy text!'
//     },
//     {
//         id: 2,
//         author: 'Niranjan',
//         text: 'Lorem ipsum dummy text!'
//     }
// ];

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { sendRequest, status, data: quoteData, error } = useHttp(getSingleQuote, true);
    
    // const quoteData = dummyQuotes.find(quote => quote.id === +params.id);

    useEffect(()=>{
        sendRequest(params.id);
    }, []);

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

    if(status === 'completed' && !quoteData){
        return <NoQuotesFound />
    }

    const quote = JSON.parse(quoteData.data);

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author} />
            {/* <Route path={`/quotes/${params.id}`} exact> */}
            {/* <Route path={match.path} exact>
                <div className="centered">
                    {/* <Link className="btn--flat" to={`/quotes/${params.id}/comments`}>Load Comments</Link> */}
                    {/* <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route> */}
            {/* <Route path={`/quotes/${params.id}/comments`}> */}
            {/* <Route path={`${match.path}/comments`}>
                <Comments quoteId={params.id} />
            </Route> */}
        </Fragment>
    )

    
    // return (
    //     <Fragment>
    //         {status === 'pending' && (
    //             <div className="centered">
    //                 <LoadingSpinner />
    //             </div>
    //         )}
    //         {error && <p className="centered focused">{error}</p>}
    //         {status === 'completed' && !quoteData && <NoQuotesFound />}
    //         {quoteData && (
    //             <Fragment>
    //                 <HighlightedQuote text={quoteData.text} author={quoteData.text} />
    //                 {/* <Route path={`/quotes/${params.id}`} exact> */}
    //                 <Route path={match.path} exact>
    //                     <div className="centered">
    //                         {/* <Link className="btn--flat" to={`/quotes/${params.id}/comments`}>Load Comments</Link> */}
    //                         <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
    //                     </div>
    //                 </Route>
    //                 {/* <Route path={`/quotes/${params.id}/comments`}> */}
    //                 <Route path={`${match.path}/comments`}>
    //                     <Comments />
    //                 </Route>
    //             </Fragment>
    //         )}
    //     </Fragment>
    // )
}

export default QuoteDetail;