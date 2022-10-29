import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";
import Commit from './commit';

const owner = "GovardhanBobbiti",
      repo = "github-commits";

let timer;
let COUNTDOWN_TIME = 30;

const CommitsPage = ({ accessToken }) => {
    const [commits, setCommits] = useState([]);
    const [countdown, setCountDown] = useState(0);
    const [isTimerOn, setTimerOn] = useState(false);
 
    const fetchCommits = async () => {
        const octokit = new Octokit({
            auth: accessToken
        });
        const fiveMostRecentCommits = await octokit.request(
            `GET /repos/{owner}/{repo}/commits`,
            { owner, repo }
        );
        setTimerOn(true);
        setCommits(fiveMostRecentCommits.data);
    }

    useEffect(() => {
        if(isTimerOn) {
            timer  = setInterval(() => {
                setCountDown(state => (state - 1))
            }, 1000); 
        }
    }, [isTimerOn]);
   
    useEffect(() => {
        if(countdown === -1) {
            refetchCommits();  
        }
    }, [countdown]);

    

    useEffect(() => {
        setCountDown(COUNTDOWN_TIME);
        fetchCommits();
    }, []);

    const refetchCommits = () => {
        setCommits([]);
        setCountDown(COUNTDOWN_TIME);
        setTimeout(() => {
            fetchCommits();
        }, 500);     
    }

    return (
        <div>
            <div className='commits-header'>
                <h1>Commits</h1>
                <div>
                    <button onClick={refetchCommits}>Refresh</button>
                    <span>{countdown}</span>
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
                    }) : (<div>Loading...</div>)
                }
            </div>
        </div>
    )
}

export default CommitsPage;