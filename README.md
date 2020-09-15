# Qlarify

#### Crowdsourcing the generation of more user-efficient clarifications by optimizing over information gain and answerability. 

*Research project conducted at [Cro+Ma Lab](https://github.com/cromaLab) under the CSE department at the University of Michigan. Project led by Yiwei Yang, and advised by Walter Lasecki.*

### Problem
Interactive systems that support Voice User Interfaces (VUIs) are growing in popularity. However, when interacting with VUIs, users tend to under-specify and make an ambiguous reference in their requests (e.g. show me the document I wrote yesterday), which causes the VUIs to ask follow-up clarifying questions.

This leads to the problem of choosing the questions that require less effort from users to clarify the ambiguous reference. Existing computational approaches would rank questions by information gain. However, oftentimes the most informative questions may require knowledge that is hard to recall or not possessed by the user (e.g., the IMDB number of a movie). On the other hand, clarifying questions that are easy to answer are often not very informative (e.g. release status of the movie). 

### Qlarify
Qlarify is a hybrid crowd-powered system that generates clarifying questions at the pareto optimum of information gain and answerability. Given an ambiguous reference (e.g. movie), the reference candidates (e.g. the movies user browsed online) and metadata (e.g. genre) regarding the reference are first crawled using Web APIs (Application Programming Interfaces). The metadata are then used to generate possible questions. Qlarify takes a user query, possible questions and reference candidates  as input. The system assists the crowd with the ranking of possible questions by information gain, and attaches each question with a normalized entropy score. The crowd then uses their world knowledge and context of the user query to estimate the answerability of the questions and balance the trade-off between information gain and answerability. 

### Components
- Table of movies

    Present the movies watched by the hypothetical end user in the past few years, and each movie with 22 metadata. To help the crowd worker to better explore the movies, the table supports sorting and filtering for each metadata. 

- Chat interface

    Allows the crowd worker to communicate with the simulated end user. The crowd worker can select a metadata, and inquire the end user for a response.

- Ranking of metadata

    A list of metadata ranked by entropy. Entropy of each metadata is calculated based on the current view of the movies table. Whenever the crowd worker applies a filter to the table, the ranking updates automatically. This features allows the crowd worker to consider both information gain and answerability when asking a question. 
