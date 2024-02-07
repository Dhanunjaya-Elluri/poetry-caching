### To Validaitor Team :) ###
# This python file contains the example of the request to the API.
# The API is based on FastAPI: if you need to see the structure of the API, you can see it from https://multi-modal-intervention.vercel.app/docs
# This is the very beggining version of the API, we are going to continously update the API. Once the API is updated, we will let you know.
###

import json
import random

import requests

# In production phase, BCT is picked up by a user. here, we randomly pick up one BCT. This is not a comprehensive list.
# the following definition is defined by the sytem and a user will pick up one of them with another ML recommendation.
bcts = [
    "behaviour goal setting: Set or agree on a goal defined in terms of the behaviour to be achieved",
    "action planning: Prompt detailed planning of performance of the behaviour (must include at least one of context, frequency, duration and intensity). Context may be environmental (physical or social) or internal (physical, emotional or cognitive)",
    "feedback on outcome(s) of behaviour: Monitor and provide feedback on the outcome of performance of the behaviour",
    "social support: Advise on, arrange, or provide practical help (e.g. from friends, relatives, colleagues, buddies or staff) for performance of the behaviour",
    "instruction on how to perform the behaviour: Advise or agree on how to perform the behaviour (includes ‘Skills training’)",
    "information about antecedents: Provide information about antecedents (e.g. social and environmental situations and events, emotions, cognitions) that reliably predict performance of the behaviour",
    "information about health consequences: Provide information about the health consequences of performing the behaviour",
    "material incentives: Inform that money, vouchers or other valued objects will be delivered if and only if there has been effort and/or progress in performing the behaviour (includes ‘Positive reinforcement’)",
    "restructuring the social environment: Change, or advise to change the social environment in order to facilitate performance of the wanted behaviour or create barriers to the unwanted behaviour (other than prompts/cues, rewards and punishments)",
    "avoidance/reducing exposure to cues for the behaviour: Advise on how to avoid exposure to specific social and contextual/physical cues for the behaviour, including changing daily or weekly routines",
    "framing/reframing: Suggest the deliberate adoption of a perspective or new perspective on behaviour (e.g. its purpose) in order to change cognitions or emotions about performing the behaviour (includes ‘Cognitive structuring’)",
    "focus on past success: Advise to think about or list previous successes in performing the behaviour (or parts of it)",
]
bct = random.choice(bcts)

# behavioural change purposes will be defined/written by a user. here, we randomly pick up one purpose.
# the followings are a part of the use cases we have done so far.
# user will write the purpose by himself/herself.
# examples:
# - promotion of smoking cessation
# - promotion of physical activity
# - promotion of healthy eating
# - promotion of medication adherence
# - promotion of cancer screening
# - promotion of vaccination
# - promotion of handwashing
# - promotion of energy conservation in household
# - promotion of water conservation
# - promotion of recycling
behavioural_change_purpose = "promotion of energy conservation in household"


# bottleneck should be defined by user.
# user will write the bottleneck by himself/herself.
# examples:
# - cancer screening is too expensive to me.
# - I don't have enough time to do physical activity.
# - I don't know how to do handwashing properly.
# - I don't know how to do recycling properly.
# - I don't know how to do energy conservation properly.
# - I don't know the rule of recyling of the city I live in.
# - Smoking is to reduce my stress.
# - People around me do not go to cancer screening.
# - The priority of cancer screening/ vaccination/ medication adherence is low.
bottleneck = "People around me do not care about energy consumption."

# Forming the payload as JSON data
json_data = json.dumps(
    {
        "bct": bct,
        "behavioural_change_purpose": behavioural_change_purpose,
        "bottleneck": bottleneck,
    }
)


request_url = "https://multi-modal-intervention.vercel.app/api.nudge-text-generator-azure.llm_chain/run"

# Making the POST request with the JSON data
response = requests.post(request_url, data=json_data)

# Check if the response is successful
if response.status_code == 200:
    print(json_data)
    print(response.json())
else:
    print("Failed to get a response:", response.status_code, response.text)
