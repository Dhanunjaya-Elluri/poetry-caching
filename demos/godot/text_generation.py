import random

from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.chat_models import AzureChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.prompts.chat import (ChatPromptTemplate,
                                    HumanMessagePromptTemplate,
                                    SystemMessagePromptTemplate)

# load environment variables
load_dotenv()

# randomly pickup one BCT. In production, this will be replaced by a BCT chosen by the user.
bcts = [
    "behaviour goal setting: Set or agree on a goal defined in terms of the behaviour to be achieved",
    "problem solving: Analyse, or prompt the person to analyse, factors influencing the behaviour and generate or select strategies that include overcoming barriers and/or increasing facilitators (includes ‘Relapse Prevention’ and ‘Coping Planning’)",
    "action planning: Prompt detailed planning of performance of the behaviour (must include at least one of context, frequency, duration and intensity). Context may be environmental (physical or social) or internal (physical, emotional or cognitive)",
    "commitment: Ask the person to affirm or reaffirm statements indicating commitment to change the behaviour",
    "feedback on behaviour: Monitor and provide informative or evaluative feedback on performance of the behaviour  (e.g. form, frequency, duration, intensity)",
    "feedback on outcome(s) of behaviour: Monitor and provide feedback on the outcome of performance of the behaviour",
    "social support: Advise on, arrange, or provide practical help (e.g. from friends, relatives, colleagues, buddies or staff) for performance of the behaviour",
    "instruction on how to perform the behaviour: Advise or agree on how to perform the behaviour (includes ‘Skills training’)",
    "information about antecedents: Provide information about antecedents (e.g. social and environmental situations and events, emotions, cognitions) that reliably predict performance of the behaviour",
    "information about health consequences: Provide information about the health consequences of performing the behaviour",
    "information about social and environmental consequences: Provide information about the social and environmental consequences of performing the behaviour",
    "anticipated regret: Ask the person to imagine and describe the regret they would feel if they did not perform the behaviour",
    "information about emotional consequences: Provide information about the emotional consequences of performing the behaviour",
    "social comparison: Draw attention to others’ performance to allow comparison with the person’s own performance",
    "information about others’ approval: Provide information about what other people think about the behaviour. The information clarifies whether others will like, approve or disapprove of what the person is doing or will do",
    "prompts/cues: Introduce or define environmental or social stimulus with the purpose of prompting or cueing the behaviour. The prompt or cue would normally occur at the time or place of performance",
    "remove aversive stimuli: Advise or agree on how to remove or avoid aversive stimuli that may prompt or cue the behaviour",
    "behaviour substitution: Prompt substitution of the unwanted behaviour with a wanted or neutral behaviour",
    "credible sources: Present verbal or visual communication from a credible source in favour of or against the behaviour",
    "comparative imaging of future outcomes: Prompt or advise the imagining and comparing of future outcomes of changed versus unchanged behaviour",
    "material incentives: Inform that money, vouchers or other valued objects will be delivered if and only if there has been effort and/or progress in performing the behaviour (includes ‘Positive reinforcement’)",
    "material reward: Arrange for the delivery of money, vouchers or other valued objects if and only if there has been effort and/or progress in performing the behaviour (includes ‘Positive reinforcement’)",
    "social reward: Arrange verbal or non-verbal reward if and only if there has been effort and/or progress in performing the behaviour (includes ‘Positive reinforcement’)",
    "reduce negative emtion: Advise on ways of reducing negative emotions to facilitate performance of the behaviour (includes ‘Stress Management’)",
    "restructuring the physical environment: Change, or advise to change the physical environment in order to facilitate performance of the wanted behaviour or create barriers to the unwanted behaviour (other than prompts/cues, rewards and punishments)",
    "restructuring the social environment: Change, or advise to change the social environment in order to facilitate performance of the wanted behaviour or create barriers to the unwanted behaviour (other than prompts/cues, rewards and punishments)",
    "avoidance/reducing exposure to cues for the behaviour: Advise on how to avoid exposure to specific social and contextual/physical cues for the behaviour, including changing daily or weekly routines",
    "framing/reframing: Suggest the deliberate adoption of a perspective or new perspective on behaviour (e.g. its purpose) in order to change cognitions or emotions about performing the behaviour (includes ‘Cognitive structuring’)",
    "focus on past success: Advise to think about or list previous successes in performing the behaviour (or parts of it)",
]

# prompt templates: system and human
system_template = "You are a professional and expereinced Short Message Service (SMS) marketer. You prefer simple and short messages."
system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)

human_template = """
Write a message that promotes behavioural change for {behavioural_change_purpose}.
A message especially focuses on how to deal with '{bottleneck}' for {behavioural_change_purpose}.
When designing a message, {bct} must be utilized."""
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

# compile human and system templates into a chat prompt
chat_prompt = ChatPromptTemplate.from_messages(
    [system_message_prompt, human_message_prompt]
)

# initialize chat model
chat = AzureChatOpenAI(
    openai_api_version="2023-05-15",
    deployment_name="text-to-nudge",
)

# initialize LLM chain
llm_chain = LLMChain(prompt=chat_prompt, llm=chat)


if __name__ == "__main__":
    response = llm_chain.invoke(
        {
            "behavioural_change_purpose": "promotion of cancer screening",
            "bottleneck": "I think cancer screening is not a priority for me",
            "bct": random.choice(bcts),
        }
    )
    print(response)
