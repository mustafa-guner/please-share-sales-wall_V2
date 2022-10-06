const cardTypes = [{
        id: "term",
        type: "Term",
        icon: '<i class="fa fa-2x fa-bandcamp" aria-hidden="true"></i>',
    },
    {
        id: "proofPoint",
        type: "Proof Point",
        icon: '<i class="fa fa-2x fa-bullseye" aria-hidden="true"></i>',
    },
    {
        id: "contentAsset",
        type: "Content Asset",
        icon: '<i class="fa fa-2x fa-asterisk" aria-hidden="true"></i>',
    },
    {
        id: "productUpdate",
        type: "Product Update",
        icon: '<i class="fa fa-2x fa-wrench" aria-hidden="true"></i>',
    },
    {
        id: "video",
        type: "Video",
        icon: '<i class="fa fa-2x fa-video-camera" aria-hidden="true"></i>',
    },
    {
        id: "prdocutFeature",
        type: "Product Feature",
        icon: '<i class="fa fa-2x fa-wrench" aria-hidden="true"></i>',
    },
];

// const cardTypes = [
//     "Statistics",
//     "Terms",
//     "Vendors",
//     "Content",
//     "Slides/Images",
//     "Training",
//     "Videos",
//     "Customers",
//     "Testimonials",
//     "Product Features"
// ];

const cards = [{
        id: "terminologyModal",
        type: "Terms",
        title: "What is Data Quality?",
        updatedAt: "January 15, 2022",
        shortDescription: "Data Quality is the process of assessing, monitoring, and improving the fitness of an organization's data for business use. Fitness is generally a measure of the accuracy, completeness, accessibility, and timeliness of data. Data quality includes capabilities for…",
        descriptionBody: [{
            title: "",
            description: [
                "Data Quality is the process of assessing, monitoring, and improving the fitness of an organization's data for business use. Fitness is generally a measure of the accuracy, completeness, accessibility, and timeliness of data. Data quality includes capabilities for processing data (integration, parsing, cleansing, matching, etc.) and for assessing data (monitoring, profiling, reporting). Data Quality is also closely related to Data Governance (metadata, security / privacy / compliance, performance, etc.). Data Quality is used by an organization to understand and improve outcomes that depend on high-quality data, such as customer experience or supply-chain management. ",
            ],
        }, ],
        tags: ["Terms", "Data Management"],
        sources: [
            "https://www.techopedia.com/definition/33764/perimeter-security ",
            "https://www.techslang.com/definition/what-is-perimeter-security/",
        ],
    },
    {
        id: "proofPrintModal",
        type: "Statistics",
        title: "Proof Point: Real-time decision throughput in under 18 milliseconds",
        updatedAt: "January 15, 2022",
        shortDescription: "Redpoint helps Xanterra move from siloed, unusable data to rich 360-degree profiles, personalized experiences, true one-to-one marketing – and triple-digit performance improvements.",
        descriptionBody: [{
                title: "SITUATION",
                description: [
                    "One of the world’s largest web services companies with a digitally focused approach and nearly 20 million customers across 56 markets. Known for its web presence and 24/7/365 call center operations.",
                ],
            },
            {
                title: "ACTION/RESULT",
                description: [
                    "With rgOne, the company unifies customer data from 20 distinct databases of online and offline data to create a golden record, an always-updating single view of the customer. With visibility into behaviors and preferences, the company uses the platform as a single point of control over data, decisions and interactions.",
                ],
            },
        ],
        tags: ["GoDaddy", "Proof Point", "PRG Performance"],
        sources: [
            "https://www.redpointglobal.com/resources/with-real-time-decisioning-digitally-focused-enterprise-transforms-customer-experience/",
        ],
    },
    {
        id: "caseStudyModal",
        type: "Content",
        title: "Case Study: Redpoint Helps Xanterra Move to Triple-Digit Performance Improvements",
        updatedAt: "January 15, 2022",
        shortDescription: "Redpoint helps Xanterra move from siloed, unusable data to rich 360-degree profiles, personalized experiences, true one-to-one marketing – and triple-digit performance improvements.",
        descriptionBody: [{
                title: "XANTERRA OBJECTIVES",
                description: [
                    "Integrate over 100 data sources from an extraordinarily diverse set of properties, transactional and management systems and third-parties.",
                    "Create rich, robust and actionable 360-degree profiles for every customer and prospect at every property.",
                    " Use profiles to simplify one-to-one marketing by identifying key segments and personas.",
                    "Use segmentation and personas to gain powerful performance benefits from personalization.",
                ],
            },
            {
                title: "XANTERRA RESULTS",
                description: [
                    "All primary data sources consolidated and continually updated, with virtually no changes to existing systems or infrastructure.",
                    "360-degree profiles established, enriched with 300+ external data attributes and automatically maintained over time.",
                    "Triple-digit performance improvements in many marketing campaigns, reaching as high as 839 percent",
                    "Personalization successfully scaled across all properties and across the full customer lifecycle",
                    "Cross-selling and sophisticated  targeting now practical for the  first time.",
                ],
            },
        ],
        tags: ["Xantra", "Case Study"],
        sources: [
            "https://www.redpointglobal.com/resources/redpoint-helps-xanterra-move-to-triple-digit-performance-improvements/",
        ],
    },
    {
        id: "productUpdateModal",
        type: "Product Releases",
        title: "Product Update: RPI 6.4",
        updatedAt: "December 17, 2021",
        shortDescription: "On Friday, December 17, 2021, Redpoint Global introduced version 6.4 of Redpoint Interaction (RPI). The update includes: Rule Designer, Segment Summary, Realtime updates and a number of customer enhancements.",
        descriptionBody: [{
                title: "",
                description: [
                    "On Friday, December 17, 2021, Redpoint Global introduced version 6.4 of Redpoint Interaction (RPI). The update encompasses a number of UI changes as well as several enhancements requested by customers.",
                ],
            },
            {
                title: "UI Changes",
                description: [
                    "Rule Designer – Compact mode: Reduces the need for scrolling when working with complex rules on smaller screens. The new compact mode applies to all panels within the Rule Designer",
                    "Rule Designer – Side-by-side mode: Compare/validate multiple rules at once without having to use a “pop out” window.",
                    "Segment Summary – Grid and bulk edit: Improves the user experience when dealing with large audience segments/outputs – apply advanced column filtering and sorting and edit cells like with Excel.",
                ],
            },
            {
                title: "Realtime",
                description: [
                    "RPI Web Client Support for Do Not Track",
                    "Merge Exclusion List support & visitor profile cache duration control",
                ],
            },
            {
                title: "Customer Enhancements",
                description: [
                    "OpenID Connect Providers – Gigya & Ping Identity",
                    "Data Connectors – Dynamics CRM, Google Ads Customer Match",
                    "New AWS Email and Push connectors, new Vibes SMS connector",
                    "Updates to SendGrid, SFDC, LuxSci connectors",
                ],
            },
        ],
        tags: ["Product Update", "RPI"],
        sources: [
            "https://www.redpointglobal.com/resources/redpoint-helps-xanterra-move-to-triple-digit-performance-improvements/",
        ],
    },
];