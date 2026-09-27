export const mockAIAnalysis = {
  overallInsight: "Across 40 recent responses, infrastructure gaps (accessibility) and cognitive friction (confusing labels) are the primary drivers of non-compliance, rather than a lack of student willingness. Addressing these two areas will yield the highest ROI.",
  themes: [
    {
      id: "bin_accessibility",
      barrier: "Bin accessibility / distance",
      confidence: 94,
      reason: "Multiple responses explicitly state that bins are 'too far', 'not on my floor', or 'inconvenient to access' during daily routines.",
      responsesCount: 14,
      percentage: 35,
      examples: [
        "I know that bottles should go separately but the recycling bin is very far from my classroom.",
        "There are no bins on my side of the building at all.",
        "There's only one bin near where I eat. I toss everything there."
      ],
      aiInsight: "Students in high-traffic areas like the Canteen and Main Block appear to understand waste segregation, but access to appropriate bins is a recurring physical barrier. This suggests that adding awareness content alone will not address the problem without infrastructure changes.",
      recommendation: "Test repositioning dry-waste and wet-waste bin clusters closer to high-traffic student seating areas and exits.",
      priorityScore: {
        frequency: "High (35%)",
        severity: "Critical",
        locations: 3,
        overall: "HIGH"
      }
    },
    {
      id: "confusing_labels",
      barrier: "Confusing labels",
      confidence: 88,
      reason: "Students repeatedly mention being 'unsure', 'confused by the text', or unable to quickly identify the correct bin for specific items like food packaging.",
      responsesCount: 9,
      percentage: 22,
      examples: [
        "I can't figure out if food leftovers go in wet or compost.",
        "I'm not always sure what goes in 'dry' vs 'wet'. The categories are vague.",
        "Labels are in English but half of us don't read them naturally while rushing."
      ],
      aiInsight: "Cognitive overload at the point of disposal is causing students to default to the mixed bin. Text-heavy or technical terminology ('compostable', 'non-biodegradable') is failing in fast-paced environments.",
      recommendation: "Replace text-heavy labels with large category icons and 2–3 visual examples of common campus waste items (e.g., 'Coffee cups go here').",
      priorityScore: {
        frequency: "Medium (22%)",
        severity: "High",
        locations: 4,
        overall: "HIGH"
      }
    },
    {
      id: "habit",
      barrier: "Habit",
      confidence: 82,
      reason: "Feedback indicates students act on autopilot ('in a hurry', 'forget', 'tired') and default to old non-segregating behaviors despite knowing better.",
      responsesCount: 8,
      percentage: 20,
      examples: [
        "I know I should but I'm usually in a hurry to get back to class.",
        "I forget late at night when I'm tired.",
        "The habit isn't fully built yet."
      ],
      aiInsight: "Good intentions are overridden by time pressure and deeply ingrained habits. The environment needs to interrupt the autopilot behavior at the exact moment of disposal.",
      recommendation: "Implement behavioral nudges—such as brightly colored bin lids or footprints leading to the correct bins—to disrupt autopilot disposal.",
      priorityScore: {
        frequency: "Medium (20%)",
        severity: "Medium",
        locations: 3,
        overall: "MEDIUM"
      }
    },
    {
      id: "lack_of_awareness",
      barrier: "Lack of awareness",
      confidence: 89,
      reason: "A distinct group of students explicitly state they have 'never been taught' or 'don't know' that segregation is required or how it works.",
      responsesCount: 6,
      percentage: 15,
      examples: [
        "I never learnt about this at home. Feels like extra effort for no visible result.",
        "Honestly didn't know there were supposed to be separate bins. Thought it was one dustbin.",
        "Never been taught what belongs in which bin on campus. I guess wrong often."
      ],
      aiInsight: "There is a baseline knowledge gap among a specific cohort, likely first-year students or those from regions without municipal segregation. This requires foundational education, not just reminders.",
      recommendation: "Run a short, mandatory visual orientation campaign at the start of the semester showing common campus waste items and their correct bins.",
      priorityScore: {
        frequency: "Low (15%)",
        severity: "Medium",
        locations: 2,
        overall: "MEDIUM"
      }
    }
  ]
};
