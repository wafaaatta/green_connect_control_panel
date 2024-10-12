const originalModule = jest.requireActual('react-router-dom');
export default {
  __esModule: true,
  ...originalModule,
  useLocation: jest.fn().mockReturnValue({ pathname: '/'}),
  useNavigate: jest.fn()
}