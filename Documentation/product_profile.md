# Product Profile: SideSlide Chrome extention

# Idea: Unified Tool with AI capabilites for PMs and TPMs in Professional Services

While exploring various ways to implement several OKR ideas and integrate AI into the daily workflow, I observed that most of the tools currently used by PM and TPM are web-based, including Jira for project and task management, Google Drive for storing project-related files, Google Docs for system creation, Google Sheets for effort estimation, and Notion as the main documentation base. Additionally, all users utilize Google Chrome as their primary browser.

This led me to the idea of creating "SideSlide." SideSlide is a Chrome extension that adds a customizable sliding panel to any webpage. The panel slides in from the right side of the screen when users click the extension icon or use a key combination, providing a consistent interface across all websites. This extension addresses the problem of context switching between tabs by offering users additional workspace without disrupting their browsing experience.

This document describes initial set of ideas, features that could be included in the product as well as the chain of thoughts describing persona and daily challenges persona faces.

## 1. Product Vision & Summary

## Product Vision

SideSlide transforms how Professional Services teams manage projects by creating a cohesive experience that eliminates information fragmentation, preserves critical context, automates repetitive tasks, and builds institutional knowledge. By reducing cognitive load and administrative burden, it enables teams to deliver projects with unprecedented efficiency—reducing context switching by 40% and information retrieval time by 50%

## 2. Target Persona

### Team Composition
- Approximately 50 Project Managers and 50 Technical Project Managers
- Cross-functional teams including developers, QA specialists, business analysts, sales, Customer care


### Primary User Roles

#### Project Managers
- Responsible for non-technical aspects of project implementation
- Primary point of contact for customer communication
- Oversee project planning and task monitoring
- Manage project organization in Jira
- Create system specifications (sometimes with TPMs)
- Develop project effort estimations
- Focus on business requirements and project delivery
- Less technical but experienced with project management tools

#### Technical Project Managers (TPMs)
- Responsible for technical aspects of project implementation
- Collaborate on system specifications and effort estimations
- Handle technical communication with customers
- Create and control development tasks
- Oversee development implementation and quality
- Test solutions or coordinate with testing teams
- Configure systems using setting keys
- Analyze codebase and architect new solutions
- Bridge between business requirements and technical implementation
- Highly technical with programming and system architecture knowledge

### Work Environment & Dynamics
- Mix of remote, hybrid, and office-based work arrangements
- Geographically distributed teams requiring effective virtual collaboration
- Fast-paced environment with concurrent projects
- Regular stakeholder meetings and updates
- Agile development methodologies

### Current Workflow & Tools
- Jira for task tracking and project management
- Notion for documentation
- Communication tools: Gmail, Google Chat
- Spreadsheets for estimations and planning
- Custom internal tools for specific processes

## 3. User Pain Points & Goals

### Pain Points

#### Information Fragmentation
- Time-consuming research process to find similar examples of system specifications, customer configurations, or codebase solutions
- Struggle to maintain context across multiple information sources related to projects
- Documentation scattered across different platforms (Notion, Google Drive, Jira)
- Mental effort required to synthesize related information from disparate systems

#### Context Switching Burden
- Constantly distracted by jumping between different project topics
- Productivity loss and mental fatigue from frequent task switching
- Difficulty maintaining deep focus on complex problems

#### Process Inefficiency
- Manual processes with numerous checkboxes
- Lack of automation creates tedious workflow and introduces human error
- Time wasted on repetitive tasks that could be systematized

#### Cognitive Overload
- Information overload leads to mental fatigue and reduced problem-solving effectiveness
- Difficulty filtering relevant from irrelevant information in data-heavy scenarios

### User Goals

#### Streamlined Information Management
- Access consolidated information from multiple sources in a single interface
- Maintain clear context when working across different projects and information sources

#### Knowledge Discovery & Reuse
- Easily find relevant examples of system specifications, configurations, and code solutions
- Reduce time spent researching by surfacing similar past work automatically

#### Focus & Context Preservation
- Maintain deep focus without disruptive context switching
- Reduce mental effort required to synthesize related information

#### Process Automation
- Reduce manual checkboxes and repetitive tasks through intelligent automation
- Minimize human error in routine processes
- Free up mental bandwidth for high-value complex problem-solving

#### Enhanced Collaboration
- Communicate reasoning and decisions clearly to stakeholders
- Facilitate asynchronous collaboration without constant meetings

## 4. Key Features & Functionality

## Core Concept
SideSlide is a Chrome extension that adds a customizable sliding panel to any webpage, providing a consistent workspace that follows users across all web-based tools. The panel slides in from the right side of the screen when triggered by the extension icon or keyboard shortcut, eliminating the need for constant tab switching.

## Primary Features

### 1. Project Management Hub
Jira is a great solution for project management because it offers robust features for tracking tasks, managing workflows, and collaborating with team members. Its customizable dashboards, agile boards, and extensive integration capabilities with other tools make it highly adaptable to various project needs. But still a lot of proceses are manual and time consuming. Several problems could be solved with SideSlide and Jira API:

#### 1.1. New Project
- Automatically detects when users are viewing a Jira project page
- One-click "Subscribe" button to add projects to personal workspace
- Role-based information fetching via Jira API (using Jira REST API to retrieve project metadata, issue data, and task dates and deadlines)
- Notification of new project assignments with quick-subscribe option (leveraging Jira webhooks and API)

#### 1.2. Overview
- At-a-glance dashboard of all subscribed projects
- Real-time status updates and changes from Jira without switching tabs (using Jira REST API to periodically fetch project updates)
- Customizable view with key metrics relevant to user role (configured using Jira JQL queries to retrieve role-specific data)
- Clickable project links that open the associated Jira project in the active tab
- Visual indicators for projects requiring attention (deadlines, blockers, updates) based on data from Jira API filters

#### 1.3. AI-Powered Plan Builder
- **Template-Based Planning**:
  - Natural language interface for quick plan creation (e.g., "Create project plan with go-live date in May")
  - Save and manage reusable plan templates
  - AI suggestions based on similar past projects
  
- **Plan Implementation**:
  - One-click deployment of plans to Jira after approval
  - Automatic task update via Jira API (using Jira update endpoints for tasks with proper relationships)


#### 1.4. Document Manager
- **Context-Aware Document Linking**:
  - Detects when users are in Google Drive, Docs, or Sheets
  - Suggests linking open documents to relevant projects (storing document references in SideSlide's storage and associating them with Jira project keys from the Jira API)
  - Organizes documents by project and document type (System Specs, Effort Estimations, etc.) using Jira project metadata
  
- **Quick Access Library**:
  - Searchable repository of all linked documents across projects
  - Recently accessed documents section
  - Direct document opening without navigating through Drive
  - Document status tracking (Draft, In Review, Approved)

### 2. TPE Builder

TP Essentials projects are standard solutions with some variations in configuration, mainly implemented for new customers as a quick win to bring them onto the platform. Currently, the process of customer creation and configuration is very manual and consists of repetitive tasks. This is a perfect candidate for automation. With the existing TA API capable of handling the majority of tasks during TPE configuration, SideSlide can serve as the user interface to trigger automation and define necessary products, features, and configurations.

- **Customer Onboarding Automation**:
  - Streamlined interface for initiating TP Essentials deployments for new customers
  - Guided workflow to select and configure standard solutions with customer-specific variations
  - Direct integration with TA API to automate repetitive configuration tasks
  
- **Configuration Management**:
  - Product and feature selection interface with pre-built templates
  - Configuration validation checks to ensure compatibility
  - Progress tracking for multi-step automation processes
  - Error handling and rollback capabilities for failed configurations

### 3. Memory Bank

Memory Bank is a centralized knowledge repository system built on Google Cloud Platform that enables teams to store, organize, and intelligently access their collective expertise through documentation. The system uses AI to enhance searchability and discovery of information across various document formats. Memory Bank solves the challenge of sharing expertise knowledge across teams by creating a central repository for system specifications, settings, and codebase documentation.

- **Intelligent Document Repository**:
  - Document storage in Cloud Storage organized by customer and project
  - AI-powered metadata generation for enhanced searchability (using Vertex AI)
  - Direct integration with SideSlide for seamless access within the work context
  - Automatic classification and tagging of uploaded documents

- **Natural Language Knowledge Interface**:
  - Context-aware query system that understands technical terminology
  - Source document references with direct download capabilities
  - Result filtering based on project context and user role
  - Historical query tracking to improve future responses

- **Knowledge Sharing Infrastructure**:
  - Collaborative annotation and commenting on repository documents
  - Direct linking between related documentation across projects
  - Usage analytics to identify most valuable knowledge assets
  - Integration with existing documentation workflows
  
## 5. Unique Value Proposition

**Initial recommendation based on provided information:**  
Unlike fragmented project management solutions that contribute to cognitive overload, our tool uniquely combines information consolidation, context preservation, and process automation specifically designed for the complex needs of transportation logistics project implementation teams - reducing context switching by 40% and information retrieval time by 50%.

## 7. Success Metrics

To measure the achievement of our product vision, we will track the following concrete metrics:

### Efficiency Metrics
- **Context Switching Reduction:** 40% decrease in time spent switching between tools and applications ([details](productivity_metrics_explanation.md#context-switching-reduction-40-decrease))
- **Information Retrieval Efficiency:** 50% reduction in time spent searching for relevant information and examples ([details](productivity_metrics_explanation.md#information-retrieval-efficiency-50-reduction))


### User Adoption & Engagement
- **Tool Adoption Rate:** 80% of target users actively using the platform within 3 months

- **Knowledge Base Contribution:** Each team contributing at least 5  items monthly in Memory bank


### User Experience Metrics

- **User Satisfaction:** Net Promoter Score (NPS) of 40+ within 6 months of launch ([details](net_promoter_score_explanation.md))
- **Productivity Perception:** 70% of users report feeling more productive


## 8. Technical Requirements & Considerations

**Initial recommendations based on provided information:**
- Integration capabilities with existing tools (Jira, Notion, Google Workspace)
- Chrome extension component for browser-based functionality
- Cloud-based architecture to support distributed teams
- Security features appropriate for sensitive logistics industry data
- Mobile compatibility for on-the-go access
- API-driven design to enable custom integrations with transportation logistics platforms