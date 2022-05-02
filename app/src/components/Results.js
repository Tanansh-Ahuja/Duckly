import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import axios from "axios";

import { useStateContext } from "../contexts/StateContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  //FACTS
  const [fact, setFact] = useState("");
  useEffect(() => {
    callFactApi();
  }, []);

  //QUOTES
  const [quote, setQuote] = useState("");

  useEffect(() => {
    callQuoteApi();
  }, []);

  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== "") {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=50`);
      }
    }
  }, [searchTerm, location.pathname]);

  var time = results?.ts;
  var finalTime = Math.round(finalTime);

  //FACT
  function callFactApi() {
    const options = {
      method: "GET",
      url: "https://random-facts2.p.rapidapi.com/getfact",
      headers: {
        "X-RapidAPI-Host": "random-facts2.p.rapidapi.com",
        "X-RapidAPI-Key": "27988b610emsh4b72adf927112aep1cf1ccjsn83974b76e073",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setFact(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function callQuoteApi() {
    const options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        "X-RapidAPI-Key": "27988b610emsh4b72adf927112aep1cf1ccjsn83974b76e073",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setQuote(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      console.log(results);
      return (
        <>
          <div
            style={{ color: "grey", fontSize: "15px" }}
            className="mb-10 mt-5 ml-56"
          >
            (Time taken for Search : {Math.round(results?.ts)} seconds)
          </div>
          <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
            {/* ALL SEARCH RESULTS: */}

            {results?.results?.map(({ link, title }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">
                    {title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </>
      );
    case "/news":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results?.entries?.map(({ id, links, source, title }) => (
            <div key={id} className="md:w-2/5 w-full ">
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer "
                className="hover:underline "
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a
                  href={source?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-blue-300"
                >
                  {" "}
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap ">
          {results?.results?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={video.additional_links?.[0].href}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return "Error...";
  }
};
