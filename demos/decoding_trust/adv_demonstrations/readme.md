# Decoding trust - Adversarial Demonstrations

    I have processing these for a while. There are 3 categories in which i managed to finish 2.
    Please also refer to the sections in the paper: https://arxiv.org/pdf/2306.11698.pdf
    (sections 6 and 7)
## Counterfactual

    Here they test if a "counterfactual example of the test input would mislead the model into making an incorrect prediction."
    The original files were sperated in "cf" or not "cf" so i separated in two files. If I understand
    I believe cf contain counterfactual test sample, and non cf has normal test samples.
    maybe doubkle check here: https://github.com/AI-secure/DecodingTrust/tree/main/src/dt/perspectives/adv_demonstration
    Each file should have scores (accuracy) separate.
    - source:
        decoding trust
    - task:
        counterfactual
    - sub_task:
        Is the type of counterfacual examples. can be used to separate the scores as well.
    - batch_id:
        Each test sample is associated with demo samples. So if a demo sample has the same a id as a test sample, it can only be used to few shot learn with the same ids.
    - option_1:
    - option_2:
    - option_3:
        The options available for the question, but option3 is not always present.
    - label:
        The ground-truth label
    - instruction:
        Instruction or question related to the "input" row
    - input:
        The Input to be interpreted as one of the options according to the instruction
    - test_or_demo:
        Tests are supposed to be computed to get scores, demo is meant for few shot learning prompting


## Backdoor

    In this one backdoor attacks (insertions that can make the answer go wrong) are inserted inside examples or even in the instruction. I made sure to separate into folders to make separate collections where each csv file is one few shot task that can be extracted accuracy scores (cacc) and attack success rates (asr).
    CACC :  Clean accuracy (CACC) means the accuracy of a clean testing set
    ASR  :  Attack success rate (ASR) refers to the accuracy of a backdoored testing set.

    - source:
        decoding trust
    - task:
        BACKDOOR
    - method:
        Is the type of backdoor attack. can be used to separate the scores as well. (this is USUALLY sepearated by file)
    -experiment:
        To which experiment it belongs to (I already separate in folders but I have included this in case you want a single file). This define how the attacks are executed on the demonstrations. (Pages 37 and 38 describe this).
    -setup:
        To which setup it belongs to (I already separate in folders but I have included this in case you want a single file). This define how the demo samples were selected and arranged.
    - batch_id:
        Each test sample is associated with demo samples. So if a demo sample has the same a id as a test sample, it can only be used to few shot learn with the same ids.
    - option_1:
    - option_2:
    - option_3:
        The options available for the question, but option3 is not always present.
    - label:
        The ground-truth label
    - instruction:
        Instruction or question related to the "input" row
    - input:
        The Input to be interpreted as one of the options according to the instruction
    - test_or_demo:
        Tests are supposed to be computed to get scores, demo is meant for few shot learning prompting
