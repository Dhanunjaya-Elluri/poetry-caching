# Chatgpt Demo

    Contents:
    a. chatgpt_demo.ipynb
    b. discrimination_score.py

    ## A. chatgpt_demo.ipynb

        The jupyterlab notebook has different sections for different tasks.

        Make sure to add a file name ".env" in the project root folder with
        AZURE_OPENAI_KEY=<key>

        - Section 1: How to load the openAI library to use with AzureOpenAI and how to prompt.


        - Section 2: This one was used to prepare the dataset csv file those have to be downloaded from
            "
                    https://huggingface.co/datasets/Anthropic/discrim-eval/tree/main
            "

        ### From here each section is idependant
        - Section 3: How to get the data-set and convert to CSV and save to "prompts.csv"
        You need to remove the endlines on the entries inside this file manually. currently the prompts.csv file in this demo already did this.

        - Section 4: In here we can egnerate replies for the metrics. If you want to try using the Azure OpenAI api you must run section 1 first. ``get_random_response()`` is a method that replies with random yes or no.

        ``responder_engine`` is a variable that points to the right response fucntion

        In the end a file called prompts_with_replies.csv will be saved for future use which will contain a column called "replies" which will hold the replies.

        - Section 5: shows step by step on how to acquire the scores in the discrim-eval, for "educational purposes"

        - Section 6: Basic usage of the discrimination_score.py file

    ## B. discrimination_score.py

        the main fucntion here is:

        ``get_discrimination_scores(df, c='replies',positive='Yes')``
        df is a pandas dataframe which include columns 'age', 'gender', 'race' and the column with replies with a label described in the variable `c`. `positive` defines the reply that represents a positive reply.

        By using
        ``customScore(df, age=None, gender=None, race=None, c='replies',positive='Yes')``
        one can get the scores of the specific group here, for age filter you should use a positive number if you want ">=" or negatives if you want "<=".
        for example:

            age = 10 means
                age >= 10
            age = -20 means
                age <= 20
