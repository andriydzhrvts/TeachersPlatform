const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const materialLevelsRouter = require('./MaterialLevelsRoutes');
const studentRouter = require('./StudentRoutes');
const teacherRouter = require('./TeacherRoutes');
const questionsRouter = require('./QuestionRoutes');
const userRouter = require('./UserRoutes');
const files = require('./FirebaseRoutes');
const subscriptionsRouter = require('./SubscriptionRoutes');
const paymentRouter = require('./PaymentRoutes');
const pricingRouter = require('./PricingRoutes');

router.use('/materials', materialRouter);
router.use('/materials-levels', materialLevelsRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/questions', questionsRouter);
router.use('/users', userRouter);
router.use('/files', files);
router.use('/subscriptions', subscriptionsRouter);
router.use('/liqpay', paymentRouter);
router.use('/pricing', pricingRouter);

module.exports = router;
