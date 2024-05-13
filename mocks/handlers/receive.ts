import {apiRoutes} from 'utils/routes/api-routes';
import {rest} from 'msw';
import {faker} from '@faker-js/faker';
import {ms} from 'mocks/ms';
import {SubmissionItem} from 'types/receive';

export const servicesOptions = [
  {title: 'Blood Alcohol Analysis', value: '1'},
  {title: 'Digital Forensic', value: '2'},
  {title: 'Friction Ridge Examination', value: '3'},
  {title: 'Rapid DNA Identification', value: '4'},
  {title: 'Seized Drugs', value: '5'},
  {title: 'Toxicology', value: '6'},
];

export const receivedItem = {
  id: '1',
  incidentCaseNumber: 'AI-6213548',
  submittingAgency: 'CLBT20220900200',
  caseType: 'Burglary',
  caseClass: '1st degree',
  caseOfficer: 'Smitty Baccol',
  filesAttached: 1,
  packingSlip: {
    url: faker.internet.url(),
    name: `Prelog-${faker.string.numeric({length: 10})}`,
  },
  items: [
    {
      id: '12345678',
      type: 'Iphone grey',
      description: 'iPhone 12 Pro Max',
      assignmentType: 'Digital forensics',
      dangerFlag: 'Broken screen',
      submittingAgency: 'NYPD',
      submissionId: faker.string.numeric({length: 4}),
      servicesRequested: servicesOptions.map((service) => ({id: service.value, name: service.title})),
    },
  ],
};

const generateItems = (count: number, submissionId: string): Partial<SubmissionItem[]> => {
  return Array(count)
    .fill(null)
    .map((): SubmissionItem => {
      return {
        id: faker.string.alphanumeric(),
        type: faker.commerce.productName(),
        description: faker.string.alphanumeric({length: 5}).toUpperCase(),
        assignmentType: 'Digital forensics',
        dangerFlag: faker.commerce.department(),
        submittingAgency: 'NYPD',
        servicesRequested: servicesOptions.map((service) => ({id: service.value, name: service.title})),
        submissionId,
      };
    });
};

const generateEmails = (count: number): string[] => {
  return Array(count)
    .fill(1)
    .map(() => `${faker.word.noun()}@cellebrite.com`);
};

export const receiveHandlers = [
  rest.get(apiRoutes.receive.pending, (_req, res, ctx) => {
    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json([
        receivedItem,
        ...Array(82)
          .fill(null)
          .map(() => {
            const submissionId = faker.string.alphanumeric({length: 4});
            return {
              id: submissionId,
              incidentCaseNumber: faker.string.alphanumeric({length: 5}).toUpperCase(),
              submittingAgency: 'NYPD',
              caseType: 'Lost Property',
              caseClass: '1st Degree',
              caseOfficer: faker.person.fullName(),
              filesAttached: faker.number.int(),
              packingSlip: {
                url: faker.internet.url(),
                name: `Prelog-${faker.string.numeric({length: 10})}`,
              },
              location: faker.address.streetAddress(),
              items: generateItems(3, submissionId),
            };
          }),
      ]),
    );
  }),

  rest.get(apiRoutes.receive.receiptEmails, (_req, res, ctx) => {
    return res(ctx.delay(ms(500)), ctx.status(200), ctx.json(generateEmails(8)));
  }),

  rest.post(apiRoutes.receive.receiptEmails, (_req, res, ctx) => {
    console.log('Emails', _req);
    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json({
        message: 'Email sent',
      }),
    );
  }),

  rest.post(apiRoutes.receive.root, (_req, res, ctx) => {
    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'invalidAgency') {
      return res(ctx.delay(ms(500)), ctx.status(400));
    }

    if (scenario === 'duplicate') {
      return res(
        ctx.delay(ms(500)),
        ctx.status(409),
        ctx.json({
          fromDepartment: 'NYPD',
          itemCode: faker.string.alphanumeric({length: 5}).toUpperCase(),
        }),
      );
    }

    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json({
        fromDepartment: 'NYPD',
        itemCode: faker.string.alphanumeric({length: 5}).toUpperCase(),
        itemDescription: faker.commerce.productDescription(),
        services: [
          {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
          },
          {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
          },
        ],
      }),
    );
  }),
];
