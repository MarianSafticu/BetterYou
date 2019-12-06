export enum GoalErrorMessages {
    EMPTY_STRING = "",
    TITLE_TOO_SHORT = "Title must have at least 3 characters.",
    DESCRIPTION_TOO_SHORT = "Description must have at least 3 characters.",
    NEGATIVE_CURRENT_PROGRESS = "Current progress can not be negative. ",
    BIGGER_CURRENT_PROGRESS = "Current progress can not be bigger then the progress to reach. ",
    NEGATIVE_PROGRESS_TO_REACH = "Progress to reach can not be zero or negative. ",
    STARTING_DATE_AFTER_ENDING = "Ending date must be after the starting date."
  }
  