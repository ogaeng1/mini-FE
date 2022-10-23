import React from "react";
import styled from "styled-components";
import Layout from "../global/Layout";

const FeedList = () => {
    return (
        <Layout>
            <FeedContainer>
                <FeedWrap />
            </FeedContainer>
        </Layout>

    );
}

export default FeedList;

const FeedContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FeedWrap = styled.div`
    width: 25%;
    height: 300px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 20px;
    margin-top: 40px;
    background-color: aquamarine;
`;