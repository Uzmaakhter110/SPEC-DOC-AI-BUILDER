import type { DocumentSection } from '../types/document';

export async function processAIInstruction(
  instruction: string,
  sections: DocumentSection[]
): Promise<DocumentSection[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const lowerInstruction = instruction.toLowerCase();

  if (
    lowerInstruction.includes('user role') ||
    lowerInstruction.includes('permission') ||
    lowerInstruction.includes('authorization')
  ) {
    return addUserRolesSection(sections);
  }

  if (
    lowerInstruction.includes('test') ||
    lowerInstruction.includes('testing')
  ) {
    return enhanceTestingSection(sections);
  }

  if (
    lowerInstruction.includes('error') ||
    lowerInstruction.includes('exception')
  ) {
    return enhanceErrorHandling(sections);
  }

  if (
    lowerInstruction.includes('security') ||
    lowerInstruction.includes('secure')
  ) {
    return addSecuritySection(sections);
  }

  if (
    lowerInstruction.includes('migration') ||
    lowerInstruction.includes('data migration')
  ) {
    return addDataMigrationSection(sections);
  }

  return enhanceGeneralContent(sections, instruction);
}

function addUserRolesSection(sections: DocumentSection[]): DocumentSection[] {
  return sections.map((section) => {
    if (section.id === '4' && section.subsections) {
      const hasRolesSection = section.subsections.some(
        (sub) => sub.title.toLowerCase().includes('role')
      );

      if (!hasRolesSection) {
        return {
          ...section,
          subsections: [
            ...section.subsections,
            {
              id: '4.5',
              title: 'User Roles and Permissions',
              content: `Define all user roles and their associated permissions:

Role: Business User
• Access Level: Display and Create
• Transactions: Display documents, Create requests
• Restrictions: Cannot approve or delete
• Authorization Object: Z_BUSINESS_USER

Role: Manager
• Access Level: Display, Create, Modify, Approve
• Transactions: All business user transactions plus approval workflows
• Restrictions: Cannot perform system configuration
• Authorization Object: Z_MANAGER

Role: System Administrator
• Access Level: Full access
• Transactions: All transactions including system configuration
• Restrictions: None
• Authorization Object: Z_SYS_ADMIN`,
              level: 2,
            },
          ],
        };
      }
    }
    return section;
  });
}

function enhanceTestingSection(sections: DocumentSection[]): DocumentSection[] {
  return sections.map((section) => {
    if (section.title.toLowerCase().includes('test')) {
      return {
        ...section,
        content: `Comprehensive testing strategy and detailed test scenarios.

Testing Phases:
1. Unit Testing - Individual component testing
2. Integration Testing - System integration validation
3. User Acceptance Testing - Business process validation
4. Performance Testing - Load and stress testing
5. Security Testing - Authorization and data security validation`,
        subsections: section.subsections?.map((sub) => {
          if (sub.title.toLowerCase().includes('scenario')) {
            return {
              ...sub,
              content: `Test Scenario 1: End-to-End Process Flow
• Description: Validate complete business process from start to finish
• Prerequisites: Master data configured, user roles assigned
• Test Steps:
  1. Login with business user credentials
  2. Navigate to transaction [T-CODE]
  3. Enter test data values
  4. Execute the process
  5. Verify output and results
• Expected Result: Process completes successfully with correct output
• Test Data: [Specify test data sets]

Test Scenario 2: Error Handling Validation
• Description: Verify system handles invalid inputs correctly
• Prerequisites: System configured, error messages defined
• Test Steps:
  1. Attempt to process with missing mandatory fields
  2. Try to exceed field length limits
  3. Submit invalid data formats
  4. Test authorization violations
• Expected Result: System displays appropriate error messages without crashing
• Test Data: Invalid data samples

Test Scenario 3: Performance Validation
• Description: Verify system performance under load
• Prerequisites: Performance testing environment ready
• Test Steps:
  1. Execute process with minimum data volume
  2. Execute with average data volume
  3. Execute with maximum expected data volume
  4. Monitor response times and resource usage
• Expected Result: Response time within acceptable limits (<3 seconds)
• Test Data: Large data sets (specify volume)`,
            };
          }
          return sub;
        }),
      };
    }
    return section;
  });
}

function enhanceErrorHandling(sections: DocumentSection[]): DocumentSection[] {
  return sections.map((section) => {
    if (
      section.title.toLowerCase().includes('error') ||
      section.id === '9'
    ) {
      return {
        ...section,
        subsections: [
          ...(section.subsections || []),
          {
            id: `${section.id}.3`,
            title: 'Error Handling Strategy',
            content: `Comprehensive error handling approach:

Error Categories:
1. Validation Errors
   • Field validation failures
   • Business rule violations
   • Data type mismatches
   • Action: Display error message, allow correction

2. System Errors
   • Database errors
   • Communication failures
   • Resource unavailability
   • Action: Log error, notify administrator, rollback transaction

3. Integration Errors
   • Interface communication failures
   • Data mapping errors
   • Timeout exceptions
   • Action: Retry mechanism, error queue, alert integration team

Error Message Standards:
• Message Class: Z_CUSTOM_MESSAGES
• Message Format: [Error Code] - [Clear Description] - [Resolution]
• Example: E001 - Invalid purchase order number - Enter valid PO number

Logging Requirements:
• All errors logged to application log (SLG1)
• Error details include: timestamp, user, transaction, error message
• Retention period: 90 days`,
            level: 2,
          },
        ],
      };
    }
    return section;
  });
}

function addSecuritySection(sections: DocumentSection[]): DocumentSection[] {
  const securitySection: DocumentSection = {
    id: '11',
    title: 'Security and Authorization',
    content: 'Comprehensive security requirements and authorization strategy.',
    level: 1,
    subsections: [
      {
        id: '11.1',
        title: 'Authorization Concept',
        content: `Security Model:
• Role-Based Access Control (RBAC)
• Principle of Least Privilege
• Segregation of Duties (SoD)

Authorization Objects:
• Object 1: Z_DISPLAY - Display authorization
• Object 2: Z_CHANGE - Change authorization
• Object 3: Z_APPROVE - Approval authorization

Field-Level Security:
• Sensitive fields masked for unauthorized users
• Audit trail for all data modifications
• Encryption for sensitive data at rest and in transit`,
        level: 2,
      },
      {
        id: '11.2',
        title: 'Security Testing',
        content: `Security Validation:
• Authorization matrix testing
• Segregation of duties validation
• Penetration testing
• Security audit compliance check

Test Cases:
• Verify unauthorized users cannot access restricted functions
• Validate field-level security controls
• Test audit trail captures all critical changes
• Confirm encryption implementation`,
        level: 2,
      },
    ],
  };

  return [...sections, securitySection];
}

function addDataMigrationSection(
  sections: DocumentSection[]
): DocumentSection[] {
  const migrationSection: DocumentSection = {
    id: '12',
    title: 'Data Migration Strategy',
    content: 'Comprehensive approach to data migration from legacy systems.',
    level: 1,
    subsections: [
      {
        id: '12.1',
        title: 'Migration Approach',
        content: `Migration Strategy:
• Phased approach by business unit
• Parallel run period: 2 weeks
• Cutover window: Weekend

Source Systems:
• Legacy System A: Customer master data
• Legacy System B: Transaction history
• Legacy System C: Reference data

Data Volume Estimates:
• Customer Records: 500,000
• Transactions: 2,000,000
• Reference Tables: 50 tables`,
        level: 2,
      },
      {
        id: '12.2',
        title: 'Data Mapping',
        content: `Mapping Rules:

Customer Master:
• Source: LEGACY_CUSTOMER -> Target: KNA1
• Field Mapping:
  - CUST_ID -> KUNNR (with leading zeros)
  - CUST_NAME -> NAME1
  - ADDRESS -> STREET, CITY, POSTAL_CODE

Transaction Data:
• Source: LEGACY_ORDERS -> Target: VBAK/VBAP
• Transformation Rules:
  - Date format conversion: MMDDYYYY -> YYYYMMDD
  - Currency conversion: Legacy currency to SAP currency
  - Status mapping: Legacy status codes -> SAP status`,
        level: 2,
      },
      {
        id: '12.3',
        title: 'Migration Testing',
        content: `Testing Phases:
1. Unit Testing: Validate individual migration scripts
2. Integration Testing: End-to-end migration process
3. Volume Testing: Full data volume migration
4. Reconciliation: Source vs. Target validation

Acceptance Criteria:
• 100% of critical data migrated successfully
• Data integrity validation passed
• Reconciliation reports show <0.1% discrepancy
• Performance within acceptable limits`,
        level: 2,
      },
    ],
  };

  return [...sections, migrationSection];
}

function enhanceGeneralContent(
  sections: DocumentSection[],
  instruction: string
): DocumentSection[] {
  return sections.map((section) => {
    if (section.id === '2') {
      return {
        ...section,
        content: `${section.content}\n\nAdditional Enhancement Based on Request:\n${instruction}\n\nThis section has been enhanced to address the specific requirements mentioned in the AI instruction. Further details and specifications can be elaborated based on project needs.`,
      };
    }
    return section;
  });
}
