import {rest} from 'msw';
import {apiRoutes} from 'utils/routes/api-routes';

export const userMock = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@cellebrite.com',
  agencyName: 'Cellebrite',
};

export const authHandlers = [
  rest.get(apiRoutes.auth.getUserInfo, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userMock));
  }),
];
