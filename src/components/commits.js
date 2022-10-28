import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";
import Commit from './commit';

const CommitsPage = ({ accessToken }) => {
    const [commits, setCommits] = useState([]);
   

    useEffect(() => {
        const octokit = new Octokit({
            auth: accessToken
        });

      const owner = "GovardhanBobbiti",
      repo = "github-commits";

        async function fetchCommits() {
            const fiveMostRecentCommits = await octokit.request(
                `GET /repos/{owner}/{repo}/commits`,
                { owner, repo }
            );
            setCommits(fiveMostRecentCommits.data);
        }
        fetchCommits();

    }, [accessToken]);

    return (
        <div>
            <h1>Commits</h1>
            <div className='commits-container'>
                {
                    commits ? commits.map(({commit}, index) => {
                        return <Commit 
                                    key={index} 
                                    message={commit.message} 
                                    committer={commit.committer.name} 
                                    date={commit.committer.date}
                                />
                    }) : null
                }
            </div>
        </div>
    )
}

export default CommitsPage;