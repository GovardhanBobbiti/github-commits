import React, { useState, useEffect  } from 'react';
import { Octokit } from "@octokit/core";
import Commit from './commit';
import LoadingComponent from './loading';

const owner = "GovardhanBobbiti",
      repo = "github-commits";

let timer;
let COUNTDOWN_TIME = 30;

const CommitsPage = ({ accessToken, handleToken }) => {
    const [commits, setCommits] = useState([]);
    const [countdown, setCountDown] = useState(0);
    const [isTimerOn, setTimerOn] = useState(false);
 
    const fetchCommits =  async () =>  {
        //accessToken = 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
        const octokit = new Octokit({
            auth: accessToken
        });

        let promise = new Promise((resolve, reject) => {
            let request = octokit.request(
                `GET /repos/{owner}/{repo}/commits`,
                { owner, repo }
            );
            request.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject();
            })
        })
        promise.then((response)=> {
            setCountDown(COUNTDOWN_TIME);
                setTimerOn(true);
                setCommits(response);
        }).catch((error) => {
            handleToken(null);
        })
        
    }


    useEffect(() => {
        if(isTimerOn) {
            timer  = setInterval(() => {
                setCountDown(state => (state - 1))
            }, 1000); 
        }
    }, [isTimerOn]);
   
    useEffect(() => {
        if(countdown === 0) {
            refetchCommits();  
        }
    }, [countdown]);

    

    useEffect(() => { 
        fetchCommits();
    }, []);

    const refetchCommits = () => {
        setCommits([]);
        setTimeout(() => {
            fetchCommits();
        }, 1000);     
    }

    return (
        <div>
            <div className='commits-header'>
                <h1>Commits</h1>
                <div>
                    <span className='countdown'>Refresh in <b>{countdown}</b></span>
                    <button className='button-style' onClick={refetchCommits}>Refresh</button>    
                </div>
            </div>
            
            <div className='commits-container'>
                {
                    commits.length > 0 ? commits.map(({commit}, index) => {
                        return <Commit 
                                    key={index} 
                                    message={commit.message} 
                                    committer={commit.committer.name} 
                                    date={commit.committer.date}
                                />
                    }) : (<LoadingComponent />)
                }
            </div>
        </div>
    )
}

export default CommitsPage;