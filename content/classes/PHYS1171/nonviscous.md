---
title: Non-viscous Flow
author: Michael McClintock, Alex van Nunen
equations: true
---

# Non-viscous Flow

# Equation of Continuity

[insert diagram here]

Let us take the closed pipe that we can see above.
Closed means that no mass can enter or leave the pipe between surface 1 and surface 2.
Since no mass can enter or leave the pipe we have conservation of mass. So the amount of water that flows through surface 1 per second must equal the amount of water that flows through surface 2.

$$\frac{mass_1}{sec}=\frac{mass_2}{sec}$$

Now we know from earlier that the density of a fluid is equal to the mass per volume:
$$\frac{\rho_1 V_1}{sec}=\frac{\rho_2 V_2}{sec}$$

If the pipe retains its cross section long enough then the volume swept out per second is simple the area times the length of the pipe:
$$\frac{\rho_1 A_1 l_1}{sec}=\frac{\rho_2 A_2 l_2}{sec}$$

We now recognize that length per second is the same as distance per second which of course is velocity. so:
$$\rho_1 A_1 v_1 = \rho_2 A_2 v_2$$

Now for an incompressible fluid the density will not change between the two surfaces, so:
$\rho_1=\rho_2=\rho$
And the density term on both sides cancels. This gives us the equation of continuity of flow as:
$$A_1 v_1=A_2 v_2$$

#Bernoulli's Equation
The fluid must also obey the conservation of energy. Let us take the following pipe:

[insert diagram here]

Firstly, we will say this is a closed system, i.e. no heat will enter or escape the fluid. Secondly, there is no viscosity in the fluid, that is we are ignoring the internal forces of the liquid.
So then the total energy of the liquid must remain constant at all locations. The total energy of the fluid at point 1 is the same as the total energy at point 2:
$$E_1=constant=E_2$$

The total energy is comprised of 2 parts, Kinetic energy and Potential energy.
The Kinetic Energy is given by:
$KE=\frac{1}{2} m v^2$
For a fluid we like to think in terms of density so:
$KE=\frac{1}{2} \rho V v^2$

The Gravitational Potential Energy is given by:
$GPE=m g h$
Again we want to use density:
$GPE=\rho V g h$

In fact we actually have 2 forms of Potential energy, the first given by gravity, and the second due to the pressure in the liquid. Remember that pressure changes within the liquid, and pressure is force per area. We would then expect that the pressure is also a form of energy. This turns out to be very simply:
$PPE=P V$

Putting all these terms together we have:
$TE=\frac{1}{2} \rho V v^2 + \rho V g h + P V = constant$

Now recognize that the volume component in all these is the same, so we can seperate it out and bring it acorss to the other side. For an incompressible liquid, the volume of the bit of water that we are following does not change, so volume remains constant.
We are then left with the famous Bernoulli Principle:
$$\frac{1}{2} \rho v^2 + \rho g h + P = constant$$