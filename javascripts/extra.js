/** 
 * Custom JavaScript Here 
 * See: https://squidfunk.github.io/mkdocs-material/customization/#additional-javascript
 **/

/* -------------- home.html ------------------ */
document$.subscribe(function () {
    /* Hero Section Data */
    var heroTitle = "Agency with Observability";
    var heroText = "Prompty is a new asset class and format for LLM prompts that aims to provide observability, understandability, and portability, for developers.";
    var heroButton = "Get The Extension";

    /* Populate Hero Section */
    document.getElementById("heroTitle").innerText = heroTitle;
    document.getElementById("heroText").innerText = heroText;
    document.getElementById("heroButton").innerText = heroButton;

    // Add pulse animation to hero image on load
    const heroImage = document.querySelector('.hero-content img');
    heroImage.classList.add('pulse-animation');

    // Increase image size by 20%
    const currentWidth = heroImage.width;
    const currentHeight = heroImage.height;
    heroImage.width = currentWidth * 1.2;
    heroImage.height = currentHeight * 1.2;
    
    // Load external CSS file
    if (!document.getElementById('extra-styles')) {
        const link = document.createElement('link');
        link.id = 'extra-styles';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/stylesheets/extra.css';
        document.head.appendChild(link);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Card data array with information for each card
    const cardsData = [
        {
            id: "what-is-prompty",
            title: "What is Prompty?", // Replace with actual title
            imageSrc: "assets/landing/what-is-prompty.png",
            imageAlt: "Venn Diagram showing prompty's three main features",
            content: "Prompty is an asset class and format for LLM prompts that aims to provide observability, understandability, and portability for developers. The primary goal is to speed up the developer inner loop! Prompty is comprised of three things:",
            listItems: ["The specification", "The tooling", "The runtime"]
        },
        {
            id: "the-specification",
            title: "The Specification", // Replace with actual title
            imageSrc: "assets/landing/specification.png",
            imageAlt: "Prompty specification",
            content: "Prompty is intended to be a language agnostic asset class for creating and managing prompts.", // Replace with actual content
            listItems: ["Uses common markdown format", "Modified front-matter to specify metadata, model settings, sample data (among other things)", "Content in a standard template format"]
        },
        {
            id: "the-specification",
            title: "The Specification", // Replace with actual title
            imageSrc: "assets/landing/specification.png",
            imageAlt: "Prompty Specification",
            content: "Prompty is intended to be a language agnostic asset class for creating and managing prompts.", // Replace with actual content
            listItems: ["Uses common markdown format", "Modified front-matter to specify metadata, model settings, sample data (among other things)", "Content in a standard template format"]
        },
        {
            id: "the-tooling",
            title: "The Tooling", // Replace with actual title
            imageSrc: "assets/landing/tooling.png",
            imageAlt: "Prompty Tooling",
            content: "Given the standard specification, there's a lot of nice things we can give developers in their environment.", // Replace with actual content
            listItems: ["Front matter autocompletion","Colorization / syntax highlighting","Validation (with red squiggles for undefined variables)","Quick run","Code generation","Evaluation generation"]
        },
        {
            id: "the-runtime",
            title: "The Runtime", // Replace with actual title
            imageSrc: "assets/landing/runtime.png",
            imageAlt: "Prompty Runtime",
            content: "Prompty runtime is the whatever engine that understands and can execute the format. As a standalone file, it can't really do anything without the help of the extension (when developing) or the runtime (when running).", // Replace with actual content
            listItems: ["Works in Python","Works in C#","(In-Progress) Works in TypeScript/JavaScript"]
        },
    ];

    // Get the container where cards will be inserted
    const cardContainer = document.getElementById('cardSectionsContainer');

    // Create and append card sections based on the data
    cardsData.forEach(card => {
        // Create card section
        const section = document.createElement('section');
        section.className = 'card-section';

        // Create card div
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        // Create and set card title
        const title = document.createElement('h2');
        title.id = card.id + 'Title';
        title.className = 'card-title';
        title.textContent = card.title;

        // Create and set card image
        const image = document.createElement('img');
        image.src = card.imageSrc;
        image.alt = card.imageAlt;
        image.className = 'card-image';
        
        // Create and set card content
        const content = document.createElement('div');
        content.className = 'card-content';
        content.id = card.id + 'Text';
        content.textContent = card.content;

        // Create and set list items
        const listContainer = document.createElement('ul');
        listContainer.className = 'card-list card-content';
        
        // Add each list item to the container
        if (card.listItems && card.listItems.length) {
            card.listItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listContainer.appendChild(listItem);
            });
        }

        // Assemble the card
        cardDiv.appendChild(title);
        cardDiv.appendChild(image);
        cardDiv.appendChild(content);
        cardDiv.appendChild(listContainer);
        section.appendChild(cardDiv);

        // Add the completed card section to the container
        cardContainer.appendChild(section);
    });
    
    // Create horizontal cards container
    const horizontalCardsSection = document.createElement('section');
    horizontalCardsSection.className = 'horizontal-cards-section';
    
    // Create section title
    const sectionTitle = document.createElement('h1');
    sectionTitle.className = 'horizontal-cards-section-title';
    sectionTitle.textContent = 'What are the benefits of using Prompty?';
    horizontalCardsSection.appendChild(sectionTitle);
    
    // Create horizontal cards container
    const horizontalCardsContainer = document.createElement('div');
    horizontalCardsContainer.className = 'horizontal-cards-container';
    
    // Horizontal cards data
    const horizontalCardsData = [
        {
            title: "Feel confident while building",
            description: "Understand what's coming and going out and how to manage it effectively."
        },
        {
            title: "Language Agnostic",
            description: "Use with any language or framework you are familiar with."
        },
        {
            title: "Flexible and Simple",
            description: "Integrate into whatever development environments or workflows you have."
        }
    ];
    
    // Create horizontal cards
    horizontalCardsData.forEach(cardData => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'horizontal-card';
        
        // Create title
        const title = document.createElement('h3');
        title.className = 'horizontal-card-title';
        title.innerHTML = `<strong>${cardData.title}</strong>`;
        
        // Create description
        const description = document.createElement('p');
        description.className = 'horizontal-card-description';
        description.textContent = cardData.description;
        
        // Assemble card
        card.appendChild(title);
        card.appendChild(description);
        
        // Add card to container
        horizontalCardsContainer.appendChild(card);
    });
    
    // Add the container to the section
    horizontalCardsSection.appendChild(horizontalCardsContainer);
    
    // Add the section to the page after the existing card sections
    document.getElementById('cardSectionsContainer').after(horizontalCardsSection);

    // Create second horizontal cards container
    const secondHorizontalCardsSection = document.createElement('section');
    secondHorizontalCardsSection.className = 'horizontal-cards-section';
    
    // Create container for the second set of cards
    const secondHorizontalCardsContainer = document.createElement('div');
    secondHorizontalCardsContainer.className = 'horizontal-cards-container';
    
    // Second horizontal cards data with background images
    const secondHorizontalCardsData = [
        {
            title: "Standards Open Doors",
            backgroundImage: "assets/landing/prompty-graph.png",
            description: "By working in a common format, we open up opportunities for new improvements",
            listItems: [
                "Simplified prompt management",
                "Built-in debugging tools"
            ]
        },
        {
            title: "Works for everyone",
            backgroundImage: "assets/landing/prompty-ascii-art-globe.png",
            description: "Prompty is built on the premise that even with increasingly complexity in AI, a fundamental unit remains prompts. And understanding this can lead to more innovative developments in AI applications, for everyone.",
            listItems: [            ]
        }
    ];
    
    // Create second set of horizontal cards
    secondHorizontalCardsData.forEach(cardData => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'horizontal-card with-bg-image';
        
        // Set background image
        if (cardData.backgroundImage) {
            card.style.backgroundImage = `url(${cardData.backgroundImage})`;
        }
        
        // Create title
        const title = document.createElement('h3');
        title.className = 'horizontal-card-title';
        title.innerHTML = `<strong>${cardData.title}</strong>`;
        
        // Create description
        const description = document.createElement('p');
        description.className = 'horizontal-card-description';
        description.textContent = cardData.description;
        
        // Create list container
        const listContainer = document.createElement('ul');
        listContainer.className = 'horizontal-card-list';
        
        // Add list items
        if (cardData.listItems && cardData.listItems.length) {
            cardData.listItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listContainer.appendChild(listItem);
            });
        }
        
        // Create content wrapper to organize the elements
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'horizontal-card-content-wrapper';
        contentWrapper.appendChild(title);
        contentWrapper.appendChild(description);
        contentWrapper.appendChild(listContainer);
        
        // Add wrapper to card
        card.appendChild(contentWrapper);
        
        // Add card to container
        secondHorizontalCardsContainer.appendChild(card);
    });
    
    // Add the container to the section
    secondHorizontalCardsSection.appendChild(secondHorizontalCardsContainer);
    
    // Add the section to the page after the first horizontal cards section
    document.querySelector('.horizontal-cards-section').after(secondHorizontalCardsSection);
});
