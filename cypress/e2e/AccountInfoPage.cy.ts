describe('계좌정보 입력 페이지', () => {
    beforeEach(() => {
        cy.visit('/login'); // 로그인 페이지로 이동

        // 로그인 폼에 데이터 입력
        cy.get('input[type="text"]').type('test@example.com'); // 이메일 입력
        cy.get('input[type="password"]').type('password123'); // 비밀번호 입력

        // 로그인 API Mocking
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/api/auth/sign-in`, {
            statusCode: 200,
            body: {
                success: true,
                data: {
                    accessToken: 'fake-token',
                    refreshToken: 'fake-refresh-token',
                },
            },
        }).as('loginRequest');

        cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭
        cy.wait('@loginRequest'); // 로그인 요청 완료 대기

        cy.visit('/accounts/:contractId'); // 계좌정보 입력 페이지로 이동
    });

    it('올바른 데이터를 입력하면 성공 메시지를 표시', () => {
        const bankName = '테스트은행';
        const accountNumber = '1234567890';
        const balance = '100000';

        // 입력 필드에 값 입력
        cy.get('input[placeholder="은행 이름을 입력하세요"]').type(bankName);
        cy.get('input[placeholder="계좌 번호를 입력하세요"]').type(accountNumber);
        cy.get('input[placeholder="잔액을 입력하세요"]').type(balance);

        // 계좌 정보 등록 API Mocking
        cy.intercept('POST', '**/api/users/accounts', {
            statusCode: 200,
            body: {
                message: '계좌 정보가 성공적으로 등록되었습니다!',
            },
        }).as('postAccountInfo');

        cy.get('button[type="submit"]').click(); // 폼 제출
        cy.wait('@postAccountInfo'); // 요청 Mock 확인

    });

    it('API 실패 시 오류 메시지를 표시', () => {
        const bankName = '테스트은행';
        const accountNumber = '1234567890';
        const balance = '100000';

        // 입력 필드에 값 입력
        cy.get('input[placeholder="은행 이름을 입력하세요"]').type(bankName);
        cy.get('input[placeholder="계좌 번호를 입력하세요"]').type(accountNumber);
        cy.get('input[placeholder="잔액을 입력하세요"]').type(balance);

        // 계좌 정보 등록 실패 API Mocking
        cy.intercept('POST', '**/api/users/accounts', {
            statusCode: 400,
            body: {
                message: '계좌 정보 등록 중 문제가 발생했습니다.',
            },
        }).as('postAccountInfoError');

        cy.get('button[type="submit"]').click(); // 폼 제출
        cy.wait('@postAccountInfoError'); // 요청 Mock 확인

        // 오류 메시지가 표시될 때까지 기다림
        cy.contains('계좌 정보 등록 중 문제가 발생했습니다.', { timeout: 10000 })
            .should('be.visible');
    });
});
