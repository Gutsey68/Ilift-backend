import { completeOnboarding, updateOnboardingStep } from '../services/onboarding.service';

export const completeOnboardingHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await completeOnboarding(userId);

    if (!result) {
      return res.status(400).json({ message: "Erreur lors de la complétion de l'onboarding" });
    }

    res.status(200).json({ message: 'Onboarding complété' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la complétion de l'onboarding" });
  }
};

export const updateOnboardingStepHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const step = req.body.step;

    await updateOnboardingStep(userId, step);

    res.status(200).json({ message: "Étape de l'onboarding mise à jour" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'étape de l'onboarding" });
  }
};
