export const impactData = [
  {
    id: "impact_labels_1",
    barrierLabel: "Confusing labels & Bin accessibility",
    barrierColor: "#2563eb",
    interventionTitle: "Redesigned Labels & Strategic Bin Placement",
    interventionDetails: [
      "Improved bin labels with distinct colors",
      "Added 3 visual examples of common waste per category",
      "Better placement/signage in high-traffic zones"
    ],
    phase: "completed",
    period: { before: "Sept 1st", after: "Sept 25th" },
    metrics: [
      {
        name: "Correct segregation",
        description: "Observed or self-reported correct sorting",
        before: 54,
        after: 71,
        goal: 80,
        unit: "%",
        lowerIsBetter: false,
      },
      {
        name: "Bin clarity rating",
        description: "Student rating on 'Easy to understand'",
        before: 2.6,
        after: 4.0,
        goal: 4.5,
        unit: "/5",
        lowerIsBetter: false,
      },
      {
        name: "Students reporting confusion",
        description: "Struggle to decide which bin to use",
        before: 41,
        after: 19,
        goal: 10,
        unit: "%",
        lowerIsBetter: true,
      }
    ]
  }
];

export const aggregateImpact = {
  overallComplianceBefore: 54,
  overallComplianceAfter: 71,
  overallComplianceGoal: 80,
  period: "Sept 2026 (Before vs After Intervention)",
};
