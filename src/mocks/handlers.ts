import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/details/:itemId', (req, res, ctx) => {
    const { itemId } = req.params;

    // Mock data for testing
    const mockDetails = {
      name: `Test Name ${itemId}`,
      height: '180',
      mass: '75',
      url: `/test-url/${itemId}/`,
    };

    return res(ctx.status(200), ctx.json(mockDetails));
  }),
];
