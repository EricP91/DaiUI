export const enTranslations = {
  evidenceManagement: {
    assignment: {
      title: 'Assignment #{{id}}',
      status: 'Assignment status',
      type: 'Assignment type',
      date: 'Creation date',
      createdBy: 'Created by',
      lastUpdated: 'Last updated',
      updatedBy: 'Updated by',
      cancel: 'Cancel Assignment',
    },
  },
  common: {
    item: {
      reject: 'Reject',
    },
    next: 'Next',
    previous: 'Previous',
    gotoDashboard: 'Go to Dashboard',
    clear: 'Clear',
    move: 'Move',
    checkout: 'Checkout',
    receive: 'Receive',
    cancel: 'Cancel',
    itemId: 'Item ID',
    itemDescription: 'Item Description',
    remove: 'Remove',
    back: 'Back',
    viewPendingAndReceive: 'View Pending & Receive',
    scanEvidence: 'Scan Evidence',
    note: 'Note',
    dialog: {
      alert: {
        confirm: 'Got it',
      },
    },
    validation: {
      required: 'Required',
      maxLength: 'should be less than {{max}} characters',
    },
    table: {
      dangerFlag: 'Danger Flag',
      submittingAgency: 'Submitting Agency',
      caseType: 'Case Type',
      caseOfficer: 'Case Officer',
      itemType: 'Item Type',
      incidentNumber: 'Incident/Case Number',
      assignmentType: 'Assignment Type',
    },
  },
  layout: {
    header: {
      platformName: 'Guardian',
      appName: 'Lab Essentials',
    },
  },
  navbar: {
    dashboard: 'Dashboard',
    evidenceManagement: {
      root: 'Evidence Management',
      addItem: 'Add Item',
      bulkUpdate: 'Bulk Update',
      move: 'Move',
      undoCheckout: 'Undo Checkout',
    },
    receiveSubmission: 'Receive Submission',
    items: 'Items',
    reports: 'Reports',
    audit: {
      root: 'Audit',
      groupPermissions: 'Group Permissions',
      startNew: 'Start New',
      viewExisting: 'View Existing',
    },
    admin: 'Admin',
  },
  dashboard: {
    myOverview: 'My Overview',
    header: {
      agencyName: 'Agency name',
      hello: 'Hello',
      receiveMenu: {
        viewPendingAndReceive: 'View Pending & Receive',
        scan: 'Scan Evidence',
      },
    },
    tiles: {
      itemsInMyCustody: 'Items in My Custody',
      unclaimedAssignments: 'Unclaimed Assignments: My sections',
      myActiveAssignments: 'My active assignments',
      reviewRequired: 'Review required: My sections',
    },
    tabs: {
      primary: {
        myAssignments: 'My Assignments',
        items: 'Items',
      },
      secondary: {
        allMyAssignments: 'All My Assignments: My Sections ({{count}})',
        allAssignmentsMySections: 'All Assignments: My Sections ({{count}})',
        activeAssignments: 'Active Assignments: All Sections ({{count}})',
        reviewRequired: 'Review Required: All Sections ({{count}})',
        allAssignmentsAllSections: 'All Assignments: ({{count}})',
        myCustody: 'My Custody ({{count}})',
        allItems: 'All Items ({{count}})',
      },
    },
    table: {
      resetFilters: 'Reset Filters',
      view: 'View',
      actions: 'Actions',
      submittingAgency: 'Submitting Agency',
      caseType: 'Case Type',
      labCaseId: 'Lab Case ID',
      lastUpdated: 'Last Updated',
      columns: 'Columns',
      searchPlaceholder: 'Search...',
      export: 'Export',
      assignments: {
        columns: {
          items: 'Items',
          age: 'Age (Days)',
          assignmentStatus: 'Assignment Status',
          claimed: 'Claimed/Assigned',
          assignmentCreation: 'Assignment Creation',
          analyst: 'Analyst',
          technicalReviewer: 'Technical Reviewer',
          technicalActionDate: 'Technical Action Date',
          administrativeReviewer: 'Administrative Reviewer',
          administrativeActionDate: 'Administrative Action Date',
          id: 'ID',
        },
      },
      items: {
        menu: {
          chainOfCustody: 'Chain of Custody',
          caseReport: 'Case Report',
        },
        columns: {
          location: 'Location',
          labCaseId: 'Lab Case ID',
          submittingAgency: 'Submitting Agency',
          itemCreationDate: 'Item Creation Date',
          itemType: 'Item Type',
          itemStatus: 'Item Status',
          dangerFlag: 'Danger Flag',
          status: 'Status',
          name: 'Name {{count}}',
          association: 'Association {{count}}',
        },
      },
    },
  },
  evidence: {
    pendingReceive: {
      confirmDialog: {
        title: 'Receive Items',
        content: 'Are you sure you want to receive {{itemsCount}} items from {{submissionCount}} submission?',
      },
      confirm: 'Start Receiving Process',
      title: 'Select submissions from Pending Submissions',
      searchPlaceholder: 'Search or type the item ID',
      table: {
        columns: {
          caseClass: 'Case Class',
          filesAttached: 'Files Attached',
          packingSlip: 'Packing Slip',
        },
      },
    },
    receive: {
      signature: {
        title: 'Signature',
        count: 'Signatures -  {{currentCount}} out of {{totalCount}} accepted',
        accept: 'Accept Signature',
        accepted: 'Signature Accepted',
        type: {
          submitter: "Submitter's Signature",
          lab: 'Lab Signature',
        },
      },
      error: {
        duplicate: 'Duplicate Scan! <b>{{itemCode}}</b> from <b>{{fromDepartment}}</b> has already been received.',
        invalidAgencyDialog: {
          title: `Can't Scan Item`,
          content:
            'The agency indicated on the barcode label is not registered in this EP. Please add this agency and then try receiving the item again.',
        },
      },
      title: 'Receiving Process',
      exit: {
        text: 'Exit Process',
        dialog: {
          type1: {
            title: 'Exit Receiving Process',
            content: `Are you sure you want to cancel the receiving process? This submission's items will not be saved.`,
          },
          type2: {
            title: 'Exit Receiving Process',
            content: `Are you sure you want to exit the receiving process? This will mean you received the items but they will remain in your custody until you move them.`,
          },
          type3: {
            title: 'Cancel Move',
            content: `Are you sure you want to exit the receiving process? This will mean you received the items but they will remain in your custody until you move them.`,
          },
        },
      },
      step1: {
        title: 'STEP 1',
        subtitle: 'Review & Edit',
        content: 'Review and edit the items you want to receive. You can also subdivide or reject items.',
      },
      step2: {
        submission: 'Submission {{id}}',
        scanYourLabInputBarcode: 'Scan Your Lab Input Barcode',
        title: 'STEP 2',
        subtitle: 'Sign Transaction',
        currentLocation: {
          title: 'Current Location',
          content: 'Agency Submission',
        },
        content: `The submitter and authorized lab representative each sign to confirm the lab's receipt of the listed items.`,
        destinationLocation: {
          title: 'Destination Location',
          content: 'Agency Custody',
        },
      },
      step3: {
        title: 'STEP 3',
        subtitle: 'Transaction Confirmed',
        content: 'Review transaction details.',
        sucessReceiveItemsMessage: 'Success! You received all items!',
        successReceiveInTheLabMessage: 'The evidence was officially received in the tab',
        buttons: {
          printReceipt: 'Print Receipt',
          emailReceiptToCaseOfficer: 'Email Receipt to Case Officer',
          emailReceipt: 'Email Receipt',
        },
        emailReceiptDialog: {
          title: 'Email Receipt',
          selectLabel: 'Email Address',
          actions: {
            sendEmail: 'Send Email',
            back: 'Back',
          },
        },
        toast: {
          successMessage: 'Receipt emailed to the case officer.',
        },
        card: {
          chainOfCustody: 'Chain of Custody',
          note: 'Note',
          signature: 'Signature',
          signatureCard: {
            submitLabel: 'Submitter printed name',
            labLabel: 'Lab printed name',
          },
        },
      },
      step4: {
        title: 'STEP 4',
        subtitle: 'Move Evidence',
        content: 'Move items in your custody, to a location.',
        additionalItem: 'To add additional items use the <Link>{{lookup}}</Link>, scan or type the Item ID.',
        lookupLink: 'lookup item tool',
        addItemDialog: {
          title: 'Add Items Manually',
          subtitle: 'Select items below. To filter the list, type a value.',
          cancel: 'Cancel',
          yes: 'Add Items',
        },
        description: {
          label: 'Destination location',
          placeholder: 'Select destination location...',
        },
        note: {
          label: 'Add note...',
        },
        print: {
          title: 'Print labels',
          closeAriaLabel: 'Close print dialog',
          print3Labels: 'Print 3 Labels',
          printAllLabels: 'Print All {{count}} Labels',
          caseLabel: 'Case Label',
          itemLabel: 'Item Label',
          microLabel: 'Micro Label',
          preview: 'Preview',
          print: 'Print',
        },
        warning: {
          title: 'Warning!',
          content:
            "You've remove <b>item {{id}}</b> from the move transaction. It will remain under your custody. Are you sure you want to proceed?",
          yes: 'Yes, Keep it in My Custody',
          no: 'No',
        },
      },
      step5: {
        title: 'STEP 5',
        subtitle: 'Complete',
        content: 'Well done. Items received.',
        receiveItemsSuccessMessage: 'Items received successfully.',
        tooltip: {
          title: 'Before you go....',
          content: 'Did you remember to print the labels?',
          button: 'Open Labels',
        },
        buttons: {
          printReceipt: 'Print Receipt',
          sendMeCopy: 'Send Me a Copy',
          emailReceipt: 'Email Receipt',
        },
        toast: {
          copySuccessMessage: 'A copy of the receipt was emailed to you.',
        },
      },
    },
    scan: {
      dialog: {
        title: 'Receive Evidence Using a Barcode Scanner',
        content: 'Scan an Item',
        actionButton: 'Start Receiving Process',
        submissionItem: {
          serviceRequired: 'Service required',
          location: 'Location',
        },
      },
    },
  },
};
