class Language {

    language = {
        title: {
            en_US: 'Language',
            zh_CN: '语言设置',
            zh_TW: '語言設置'
        },
        value: {
            en_US: 'English',
            zh_CN: '简体中文',
            zh_TW: '繁體中文'
        }
    }

    menus = {
        tabBarHome: {
            en_US: 'ASSETS',
            zh_CN: '资产',
            zh_TW: '資產'
        },
        tabBarNews: {
            en_US: 'NEWS',
            zh_CN: '动态',
            zh_TW: '動態'
        },
        tabBarPersonal: {
            en_US: 'PERSONAL',
            zh_CN: '个人中心',
            zh_TW: '個人中心'
        },
        tabBarDiscover: {
            en_US: 'DISCOVER',
            zh_CN: '发现',
            zh_TW: '发现'
        },
        tabExchange: {
            en_US: 'TRADE',
            zh_CN: '交易',
            zh_TW: '发现'
        }
    }

    personal = {

        en_US: {
            address: 'Address Book',
            message: 'Messages',
            setting: 'Settings',
            safety: 'Safety',
            help: 'Help',
            invite: 'My Invite Code',
            about: 'About Us',
            contract: 'Terms of Use',
            exit: 'Log out',
        },
        zh_CN: {
            address: '地址簿',
            message: '消息',
            setting: '设置',
            safety: '安全',
            help: '帮助',
            invite: '我的邀请码',
            about: '关于',
            contract: '使用协议',
            exit: '退出登录',
        },

        address: {
            en_US: 'Address Book',
            zh_CN: '地址簿',
            zh_TW: '地址簿'
        },
        message: {
            en_US: 'Messages',
            zh_CN: '消息',
            zh_TW: '消息'
        },
        setting: {
            en_US: 'Settings',
            zh_CN: '设置',
            zh_TW: '設置'
        },
        safety: {
            en_US: 'Safety',
            zh_CN: '安全',
            zh_TW: '安全'
        },
        help: {
            en_US: 'Help',
            zh_CN: '帮助',
            zh_TW: '幫助'
        },
        invite: {
            en_US: 'Invite Code',
            zh_CN: '我的邀请码',
            zh_TW: '我的邀请码'
        },
        about: {
            en_US: 'About Us',
            zh_CN: '关于我们',
            zh_TW: '關於'
        },
        contract: {
            en_US: 'Terms of Use',
            zh_CN: '使用协议',
            zh_TW: '使用協議'
        },
        exit: {
            en_US: 'Log out',
            zh_CN: '退出登录',
            zh_TW: '退出登录'
        }
    }

    assets = {
        en_US: {
            amountTitle: {
                available: 'Available',
                frozen: 'Frozen',
                total: 'Total',
                transfer: 'Transfer',
                exchange: 'Exchange',
            }
        },
        zh_CN: {
            amountTitle: {
                available: '可用',
                frozen: '冻结',
                total: '合计',
                transfer: '转账历史',
                exchange: '币币交易',
            }
        },
    }

    tx = {
        en_US: {
            title: [
                {title: 'ALL'},
                {title: 'IN'},
                {title: 'OUT'},
            ],
            type: {
                all: "ALL",
                in: "IN",
                out: "OUT"
            },
            status: {
                processing: "PROCESSING",
                fail: "FAILED",
                completed: "COMPLETED"
            },
            button: {
                in: "Receive",
                out: "Send"
            },
            transfer: {
                title: 'Transfer',
                balance: 'Balance',
                inputAmount: 'Please enter the amount',
                address: 'Address',
                addressPlace: 'Please enter the address',
                remark: 'Remark',
                remarkPlace: 'Optional',
                button: 'NEXT',
            },
            detail: {
                title: 'Transaction Detail',
                type: 'Type',
                state: 'State',
                time: 'Time',
                fee: 'Fee',
                receiveAddress: 'Receive Address',
                remark: 'Remark',
                txHash: 'Hash',
            },
            fee: 'Fee'
        },
        zh_CN: {
            title: [
                {title: '全部'},
                {title: '转入'},
                {title: '转出'},
            ],
            status: {
                processing: "处理中",
                fail: "失败",
                completed: "已完成"
            },
            type: {
                all: "全部",
                in: "转入",
                out: "转出"
            },
            button: {
                in: "收款",
                out: "转账"
            },
            transfer: {
                title: '转账',
                balance: '余额',
                inputAmount: '请输入金额',
                address: '收款地址',
                addressPlace: '请输入收款地址',
                remark: '备注',
                remarkPlace: '选填',
                button: '下一步'
            },
            detail: {
                title: '交易详情',
                type: '类型',
                state: '处理中',
                time: '时间',
                receiveAddress: '收款地址',
                remark: '备注',
                fee: '交易费',
                txHash: '交易哈希',
            },
            fee: '交易费'
        },
    }

    exchange = {
        en_US: {
            title: 'Exchange',
            inputPrice: 'Please enter price',
            inputAmount: 'Please enter amount',
            amountNotEnough: ' is not enough',
            subTradeSuccess: 'Submitted Successfully',
            cancelSuccess: 'Cancel Successfully',
            cancelFail: 'Cancel Failed',
            price: 'Price',
            amount: 'Amount',
            total: 'Total',
            totalS: 'Total',
            fee: 'Fee',
            noRecord: 'No records',
            buy: 'BUY',
            sell: 'SELL',
            openOrders: 'Open orders',
            all: 'All',
            time: 'Date',
            avgPrice: 'AVG Price',

            available: 'Available',
            totalIn: 'Total',

            tradeType: 'Order Type',
            tradeState: 'Order State',
            stateProcessing: 'Processing',
            stateCompleted: 'Excuted',
            stateCancel: 'Cancelled',
            tradeHistory: 'History',
            tradeDetail: 'Detail',

            searchCurrency:'Search Currency',
            loadMore:'click to load more',
            atBottom:'loaded',

        },
        zh_CN: {
            title: '币币',
            inputPrice: '请输入交易单价',
            inputAmount: '请输入交易数量',
            amountNotEnough: ' 数量不足',
            subTradeSuccess: '提交成功',
            cancelSuccess: '撤销成功',
            cancelFail: '撤销失败',
            price: '价格',
            amount: '数量',
            total: '成交量',
            totalS: '成交额',
            fee: '手续费',
            noRecord: '暂无记录',
            buy: '买入',
            sell: '卖出',
            openOrders: '委托',
            all: '全部',
            time: '时间',
            avgPrice: '成交均价',
            available: '可用',
            totalIn: '交易额',

            tradeType: '交易类型',
            tradeState: '交易状态',
            stateProcessing: '挂单中',
            stateCompleted: '已完成',
            stateCancel: '已撤销',
            tradeHistory: '交易历史',
            tradeDetail: '成交明细',

            searchCurrency:'搜索币种',

            loadMore:'点击加载更多',
            atBottom:'已在最底部',

        }
    }


    errorCode = {
        en_US: {
            F0001: "System internal error. ",
            F0002: "Authentication fails",
            F0003: "Verification code is invalid or has expired.",
            F0004: "Incorrect user name or password",
            F0005: "Business parameter validation failed",
            F0006: "Basic parameter check failed",
            F0007: "Your login status has expired. Please login ",
            F0008: "Invalid payment password",
            F0009: "The user does not exist",
            F0010: "For the security of assets, the transfer needs to bind the mobile first.",
            F0011: "Invalid image verification code",
            FAIL: "The request failed",
            MOBILEHASBADING: "The mobile already in use",
            EMAILHASBADING: "The email already in use",
            INSUFFICIENTBALANCE: "Insufficient balance",
            MoreThanMaximumDecimal: "The decimal place of the transfer amount exceeds the maximum decimal place supported by the currency",
        },
        zh_CN: {
            F0001: "系统内部异常",
            F0002: "鉴权失败",
            F0003: "验证码无效或已过期",
            F0004: "用户名或密码不正确",
            F0005: "业务参数校验失败",
            F0006: "基本参数校验失败",
            F0007: "登录身份已过期，请重新登录",
            F0008: "支付密码不正确",
            F0009: "用户不存在",
            F0010: "为了资金安全，转账需要先绑定手机号",
            F0011: "无效的图片验证码",
            FAIL: "请求失败",
            MOBILEHASBADING: "该手机号已经被使用",
            EMAILHASBADING: "该邮箱已经被使用",
            INSUFFICIENTBALANCE: "余额不足",
            MoreThanMaximumDecimal: "转账金额的小数位超过该币支持的最大小数位",
        }

    }
    failCode = {
        en_US: {
            register: "Registration failed! ",
            noEnoughAmount: "The amount transferred exceeds the current balance",
            noPaymentPasswrord: "Not set payment password, Jumping page... ",
            inputPaymentPasswrord: "Please enter the payment password",
            inputAddress: "Please enter the address",
            inputAmount: "Please enter the amount",
            receiveAddress: "The receive address cannot be your own",
            invalidAddress: "Invalid Address",
        },
        zh_CN: {
            register: "注册失败",
            noEnoughAmount: "转账金额超过了当前余额! ",
            noPaymentPasswrord: "请先设置支付密码,正在跳转页面 ",
            inputPaymentPasswrord: "请输入支付密码! ",
            inputAddress: "请输入收款地址！",
            inputAmount: "请输入金额",
            receiveAddress: "收款地址不能是自己",
            invalidAddress: "无效的收款地址",
        }
    }


    successCode = {
        en_US: {
            sendCode: "Successfully!",
            transfer: "Submit the transfer successfully, the system is processing...",
        },
        zh_CN: {
            sendCode: "发送成功",
            transfer: "提交转账成功，系统正在处理...",
        },
        zh_TW: {
            sendCode: "发送成功",
        }
    }


    personalCenter = {
        en_US: 'Personal',
        zh_CN: '个人中心',
        zh_TW: '個人中心'
    }
    message = {
        en_US: 'Message',
        zh_CN: '我的消息',
        zh_TW: '我的消息'
    }

    QrCode = {
        en_US: 'QrCode',
        zh_CN: '二维码/收款',
        zh_TW: '二維碼/收款'
    }
    help = {
        en_US: 'Help',
        zh_CN: '帮助中心',
        zh_TW: '幫助中心'
    }
    back = {
        en_US: 'BACK',
        zh_CN: '返回',
        zh_TW: '返回'
    }
    assetsDetail = {
        en_US: 'WithdrawalsRecord',
        zh_CN: '提现记录',
        zh_TW: '提現記錄'
    }
    all = {
        en_US: 'All',
        zh_CN: '全部',
        zh_TW: '全部'
    }
    recharge = {
        en_US: 'Recharge',
        zh_CN: '充值',
        zh_TW: '充值'
    }
    withdrawals = {
        en_US: 'Withdrawals',
        zh_CN: '提现',
        zh_TW: '提現'
    }
    transfer = {
        en_US: 'Transfer',
        zh_CN: '转账',
        zh_TW: '转账'
    }
    withdrawSucc = {
        en_US: 'Submit successfully, we will process your withdrawal application within 24 hours',
        zh_CN: '提交成功，我们将在24小时内处理您的提现申请',
        zh_TW: '提交成功，我們將在24小時內處理您的提現申請'
    }
    aboutUs = {
        en_US: 'About Us',
        zh_CN: '关于我们',
        zh_TW: '關於我們'
    }
    changePassword = {
        en_US: 'ChangePassword',
        zh_CN: '修改密码',
        zh_TW: '修改密碼'
    }
    paymentCode = {
        en_US: 'Payment\n Password',
        zh_CN: '支付密码',
        zh_TW: '支付密碼'
    }
    copy = {
        en_US: 'Copy',
        zh_CN: '复制',
        zh_TW: '復制'
    }
    OK = {
        en_US: 'OK',
        zh_CN: '确认',
        zh_TW: '確認'
    }
    cancel = {
        en_US: 'Cancel',
        zh_CN: '取消',
        zh_TW: '取消'
    }
    chooseCoins = {
        en_US: 'Currency',
        zh_CN: '货币',
        zh_TW: '貨幣'
    }
    balance = {
        en_US: 'Balance',
        zh_CN: '余额',
        zh_TW: '余額'
    }
    address = {
        en_US: 'Adress',
        zh_CN: '提现地址',
        zh_TW: '提現地址'
    }
    amount = {
        en_US: 'Amount',
        zh_CN: '提现金额',
        zh_TW: '提現金額'
    }
    inputAddress = {
        en_US: 'Input Address',
        zh_CN: '请输入提现地址',
        zh_TW: '請輸入提現地址'
    }
    inputPayPassword = {
        en_US: 'Input Payment Password',
        zh_CN: '请输入支付密码',
        zh_TW: '請輸入支付密码'
    }
    inputAmount = {
        en_US: 'Input Amount',
        zh_CN: '请输入提现金额',
        zh_TW: '請輸入提現金額'
    }
    inputPlace = {
        en_US: 'Input',
        zh_CN: '请输入',
    }
    commission = {
        en_US: 'Fee',
        zh_CN: '手续费',
        zh_TW: '手續費'
    }
    login = {
        en_US: 'Login',
        zh_CN: '登录',
        zh_TW: '登錄'
    }
    home = {
        en_US: 'Home',
        zh_CN: '首页',
        zh_TW: '首頁'
    }

    member = {

        nationality: {
            en_US: "Nationality",
            zh_CN: '国籍',
        },
        tabs: {
            en_US: [
                {title: 'Mobile'},
                {title: 'Email'},
            ],
            zh_CN: [
                {title: '手机号'},
                {title: '邮箱地址'},
            ],
        }
    }

    safety = {
        hasSet: {
            en_US: 'Has set',
            zh_CN: '已设置',
            zh_TW: '已设置'
        },
        notSet: {
            en_US: 'Not set',
            zh_CN: '未设置',
            zh_TW: '未设置'
        },
        bound: {
            en_US: 'Bound',
            zh_CN: '已绑定',
            zh_TW: '已绑定'
        },
        unbound: {
            en_US: 'Unbound',
            zh_CN: '未绑定',
            zh_TW: '未绑定'
        },
        bandEmail: {
            en_US: 'Binding email',
            zh_CN: '绑定邮箱',
            zh_TW: '绑定邮箱'
        },
        bandMobile: {
            en_US: 'Binding mobile',
            zh_CN: '绑定手机号',
            zh_TW: '绑定手机号'
        },
        setPayPassword: {
            en_US: 'Set payment password',
            zh_CN: '设置支付密码',
            zh_TW: '设置支付密码'
        }
    }


    account = {
        en_US: 'Account',
        zh_CN: '账户',
        zh_TW: '賬戶'
    }

    email = {
        en_US: 'Email',
        zh_CN: '邮箱',
        zh_TW: '郵箱'
    }
    mobile = {
        en_US: 'Mobile',
        zh_CN: '手机',
        zh_TW: '手机'
    }
    password = {
        en_US: 'Password',
        zh_CN: '密码',
        zh_TW: '密碼'
    }
    payPassword = {
        en_US: 'Payment password',
        zh_CN: '支付密码',
        zh_TW: '支付密碼'
    }
    inputAccount = {
        en_US: 'Input Email or Mobile',
        zh_CN: '请输入邮箱或者手机号码',
        zh_TW: '請輸入郵箱或者手機號碼'
    }

    inputEmail = {
        en_US: 'Input Email',
        zh_CN: '请输入邮箱地址',
        zh_TW: '請輸入郵箱地址'
    }
    inputMobile = {
        en_US: 'Input Mobile',
        zh_CN: '请输入手机号码',
        zh_TW: '請輸入手机号码'
    }
    inputPassword = {
        en_US: '8-18 characters',
        zh_CN: '8-18位字符',
        zh_TW: '8-18位字符'
    }
    forgetPassword = {
        en_US: 'Forget Password',
        zh_CN: '忘记密码',
        zh_TW: '忘記密碼'
    }
    register = {
        en_US: 'Register',
        zh_CN: '注册会员',
        zh_TW: '註冊會員'
    }
    next = {
        en_US: 'Next',
        zh_CN: '下一步',
        zh_TW: '下壹步'
    }
    findPassword = {
        en_US: 'Modify Password',
        zh_CN: '修改密码',
        zh_TW: '修改密碼'
    }
    resetPassword = {
        en_US: 'Reset Password',
        zh_CN: '重置密码',
        zh_TW: '修改密碼'
    }
    findPayPassword = {
        en_US: 'Modify Payment password',
        zh_CN: '修改支付密码',
        zh_TW: '修改支付密碼'
    }
    setPayPassword = {
        en_US: 'Set Payment password',
        zh_CN: '设置支付密码',
        zh_TW: '设置支付密碼'
    }
    transactionDetail = {
        en_US: 'Transaction Detail',
        zh_CN: '交易明细',
        zh_TW: '交易明細'
    }
    confirm = {
        en_US: 'Confirm',
        zh_CN: '确认密码',
        zh_TW: '確認密碼'
    }
    confirmPassword = {
        en_US: 'Input Again',
        zh_CN: '请确认密码',
        zh_TW: '請確認密碼'
    }
    submit = {
        en_US: 'Submit',
        zh_CN: '提交',
        zh_TW: '提交'
    }
    captcha = {
        en_US: 'Code',
        zh_CN: '验证码',
        zh_TW: '驗證碼'
    }
    picCaptcha = {
        en_US: 'Image code',
        zh_CN: '图片验证码',
        zh_TW: '图片验证码'
    }
    inputCaptcha = {
        en_US: 'Input Code',
        zh_CN: '请输入验证码',
        zh_TW: '請輸入驗證碼'
    }
    inputPicCaptcha = {
        en_US: 'Input the 4 digits in the image',
        zh_CN: '请输入图片中的4位数字',
        zh_TW: '请输入图片中的4位数字'
    }
    register1 = {
        en_US: 'Register',
        zh_CN: '注册',
        zh_TW: '註冊'
    }
    inviteCode = {
        en_US: 'Invite Code',
        zh_CN: '邀请码',
        zh_TW: '邀请码'
    }
    myRecord = {
        en_US: 'Invited users',
        zh_CN: '邀请用户数',
        zh_TW: '邀请用户数'
    }
    genInvite = {
        en_US: 'Generate invitation card',
        zh_CN: '生成邀请卡',
        zh_TW: '生成邀请卡'
    }
    noRecord = {
        en_US: 'No Invite Record',
        zh_CN: '没有邀请记录',
        zh_TW: '没有邀请记录'
    }
    optional = {
        en_US: 'Optional',
        zh_CN: '选填',
        zh_TW: '选填'
    }
    resend = {
        en_US: '',
        zh_CN: '后重发',
        zh_TW: '後重發'
    }
    getCode = {
        en_US: 'Get Code',
        zh_CN: '发送验证码',
        zh_TW: '發送驗證碼'
    }
    accountEmpty = {
        en_US: "Please input your email or mobile!",
        zh_CN: '请输入邮箱地址！',
        zh_TW: '请输入邮箱地址！'
    }
    emailEmpty = {
        en_US: "Please input your email!",
        zh_CN: '请输入邮箱地址！',
        zh_TW: '请输入邮箱地址！'
    }
    invalidEmail = {
        en_US: "Invalid email address!",
        zh_CN: '无效的邮箱地址！',
        zh_TW: '无效的邮箱地址！'
    }
    phoneEmpty = {
        en_US: "Please input your mobile!",
        zh_CN: '请输入手机号！',
        zh_TW: '请输入手机号！'
    }
    captchaEmpty = {
        en_US: "Please input image verification code!",
        zh_CN: '请输入图片验证码！',
        zh_TW: '请输入图片验证码！'
    }
    passwordEmpty = {
        en_US: "Please input your password!",
        zh_CN: '请输入密码！',
        zh_TW: '请输入密码！'
    }
    differentPassword = {
        en_US: "Inconsistent password entered twice!",
        zh_CN: '两次输入密码不一致！',
        zh_TW: '两次输入密码不一致！'
    }
    invalidPassword = {
        en_US: "Password format verification failed, 8-18 characters",
        zh_CN: '密码格式校验失败，8-18位字符！',
        zh_TW: '密码格式校验失败，8-18位字符！'
    }
    registerSuccess = {
        en_US: "Registration Successful!",
        zh_CN: '注册成功！',
        zh_TW: '註冊成功！'
    }
    resetSuccess = {
        en_US: "Reset password successful!",
        zh_CN: '重置密码成功！',
        zh_TW: '重置密码成功！'
    }
    captchaEmpty = {
        en_US: "Please input Code!",
        zh_CN: '请输入验证码！',
        zh_TW: '请输入验证码！'
    }

    loginSuccess = {
        en_US: "Login Successfully!",
        zh_CN: '登录成功！',
        zh_TW: '登錄成功！'
    }
    loginFail = {
        en_US: "Login Failed,please check the username or password",
        zh_CN: '登录失败，请检查用户名或密码',
        zh_TW: '登錄失敗，請檢查用戶名或密碼'
    }
    loginRegister = {
        en_US: "Login/Register",
        zh_CN: '登录/注册',
        zh_TW: '登錄/註冊'
    }
    copySucc = {
        en_US: "Copy successfully",
        zh_CN: '复制成功',
        zh_TW: '復制成功'
    }
    type = {
        en_US: "Type",
        zh_CN: '交易类型',
        zh_TW: '交易類型'
    }
    transAddress = {
        en_US: "Address",
        zh_CN: '交易地址',
        zh_TW: '交易地址'
    }
    createDate = {
        en_US: "CreateDate",
        zh_CN: '创建时间',
        zh_TW: '創建時間'
    }
    tansSucc = {
        en_US: "Successful dealing",
        zh_CN: '交易成功',
        zh_TW: '交易成功'
    }
    tansFail = {
        en_US: "Waiting to be processed",
        zh_CN: '等待处理',
        zh_TW: '等待處理'
    }
    updateSucc = {
        en_US: "Updated successfully",
        zh_CN: '修改成功',
        zh_TW: '修改成功'
    }
    readed = {
        en_US: "Read",
        zh_CN: '已读',
        zh_TW: '已讀'
    }
    unread = {
        en_US: "Unread",
        zh_CN: '未读',
        zh_TW: '未讀'
    }
    add = {
        en_US: "Add",
        zh_CN: '添加',
        zh_TW: '添加'
    }
    noMessage = {
        en_US: "No Message",
        zh_CN: '暂无消息',
        zh_TW: '暫無消息'
    }
    noTransca = {
        en_US: "No Transaction",
        zh_CN: '暂无交易',
        zh_TW: '暫無交易'
    }
    choose = {
        en_US: "Choose",
        zh_CN: '选择',
        zh_TW: '選擇'
    }
    addEmpty = {
        en_US: "Address can't be empty!",
        zh_CN: '地址不能为空！',
        zh_TW: '地址不能為空！'
    }
    valueEmpty = {
        en_US: "Amount can't be empty!",
        zh_CN: '金额不能为空！',
        zh_TW: '金額不能為空！'
    }
    lackOf = {
        en_US: "Not sufficient funds!",
        zh_CN: '余额不足!',
        zh_TW: '余額不足!'
    }
    noAssets = {
        en_US: "No Assets",
        zh_CN: '暂无资产',
        zh_TW: '暫無資產'
    }


}

export default Language;
